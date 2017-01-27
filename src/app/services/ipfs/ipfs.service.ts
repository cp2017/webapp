import {Injectable} from '@angular/core';
import * as concat from 'concat-stream';
import {Microservice} from "../entities/microservice";
declare var IpfsApi: any;

@Injectable()
export class IpfsService {

  // The connection to the IPFS daemon
  private _node: any = null;
  private _nodeId: number;

  constructor() {
  }

  get node(): any {
    return this._node;
  }

  get nodeId(): number {
    return this._nodeId;
  }

  /**
   * Connects to a locally running IPFS daemon if not already done. If the connection to the daemon was already initialized,
   * we return the already initialized connection.
   * @returns {Promise<TResult>|Promise<U>} A promise that resolves as soon as we are connected to IPFS
   */
  public connectIpfsDeamon(multiaddr: string = "/ip4/127.0.0.1/tcp/5001"): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.node == null) {
        // Create the IPFS node instance
        // for simplicity, we create a new repo everytime the node
        // is created, because you can't init already existing repos
        const node = new IpfsApi(multiaddr);

        node.id()
          .then((id) => {
            console.log('My IPFS node id is: ', id.id);
            this._nodeId = id.id;
            this._node = node;
            // create services dir if not already existing
            this._node.files.ls('/', (fileSystemError, fileSystemRes) => {
              if (fileSystemError || !fileSystemRes) {
                reject(new Error("ipfs file system error" + fileSystemError + fileSystemRes));
              } else {
                let servicesDirExists = false;
                if (fileSystemRes.Entries != undefined) {
                  for (let directory of fileSystemRes.Entries) {
                    if (directory.Name == 'services') {
                      servicesDirExists = true;
                    }
                  }
                }
                if (!servicesDirExists) {
                  this._node.files.mkdir('/services/', () => {
                  });
                }
                resolve(node);
              }
            });
            // This tog breaks the test
        //    console.log(this._node);
          })
          .catch((err) => {
            console.log('Connect Ipfs Daemon failed: ' + err.message);
            reject(err);
          });
      } else {
        resolve(this.node);
      }
    });
  }


  /**
   * Puts a string to IPFS and returns the IPFS file
   * @param val The string value, that you want to put to IPFS
   * @returns {Promise<T>} A promise, which resolves the IPFS file as soon as the string is put to IPFS
   */
  public putToIpfs(val: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this._node != null) {
        this._node.add(new Buffer(val), (err, res) => {
          if (err || !res) {
            reject(new Error("ipfs add error" + err + res));
          }
          if (res.length == 1) {
            let ipfsFile = res[0];
            resolve(ipfsFile);
          } else {
            reject(new Error("Something went wrong"));
          }
        });
      } else {
        reject(new Error("You have to connect to an IPFS deamon first!"));
      }
    });
    return promise;
  }

  /**
   * Puts a new service to IPFS and republishes the services directory to IPNS. It returns the IPFS file for the new service
   * @param metadata The service metadata as a json string
   * @param swagger The service interface description as a json string
   * @param name The name of the service
   * @returns {Promise<T>} A promise, which resolves the IPFS file as soon as the service is put to IPFS
   */
  public putServiceToIpfs(microservice: Microservice, swagger: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this._node != null) {
        // 1. Create the directory in the file system
        this._node.files.mkdir('/services/' + microservice.name + '/', () => {
          // 2. Write the metadata and swagger files to the file system
          let options = {create: true, flush: true};
          // At the moment we do not check the results of the write method because the current implementation of ipfs-js-api does not return anything
          this._node.files.write('/services/' + microservice.name + '/swagger.json', new Buffer(swagger), options, () => {
            microservice.IPNS_URI = encodeURI("https://ipfs.io/ipns/" + this._nodeId + "/" + microservice.name);
            let metadataJson = JSON.stringify(microservice);
            this._node.files.write('/services/' + microservice.name + '/metadata.json', new Buffer(metadataJson), options, () => {
              // 3. Publish the changes of the file system to IPFS
              this._node.files.stat('/services/', (servicesDirErr, servicesDirRes) => {
                if (servicesDirErr || !servicesDirRes) {
                  reject(new Error("ipfs add error" + servicesDirErr + servicesDirRes));
                } else {
                  // 4. Publish the new version of the services directory to IPNS
                  this._node.name.publish('/ipfs/' + servicesDirRes.Hash, (ipnsError, ipnsResult) => {
                    if (ipnsError || !ipnsResult) {
                      reject(new Error("ipns publish error" + ipnsError + ipnsResult));
                    } else {
                      // 5. Get the hash of the new service and use it to resolve the promise
                      this._node.files.stat('/services/' + microservice.name + '/', (newServiceDirErr, newServiceDirRes) => {
                        if (newServiceDirErr || !newServiceDirRes) {
                          reject(new Error("ipfs add error" + newServiceDirErr + newServiceDirRes));
                        } else {
                          resolve(newServiceDirRes);
                        }
                      });
                    }
                  });
                }
              });
            });
          });
        });
      } else {
        reject(new Error("You have to connect to an IPFS deamon first!"));
      }
    });
    return promise;
  }

  /**
   * Gets an IPFS file as string for a given hash
   * @param hash The hash which is the address for your file
   * @returns {Promise<T>} A promise that resolves the file as a string as soon as we got it from IPFS
   */
  public getFromIpfs(hash: string): Promise<string> {
    let promise = new Promise((resolve, reject) => {
      // buffer: true results in the returned result being a buffer rather than a stream
      this.node.cat(hash, (err, res) => {
        if (err || !res) {
          console.error('ipfs cat error', err, res);
          reject(err);
        }
        res.pipe(concat(data => {
          let string = IpfsService.Utf8ArrayToStr(data);
          resolve(string);
        }))
      })
    });
    return promise;
  }

  /**
   * Gets an IPNS file as string for a given name
   * @param name The name which is the address for your file
   * @returns {Promise<T>} A promise that resolves the file as a string as soon as we got it from IPFS
   */
  public getFromIpns(name: string): Promise<string> {
    let promise = new Promise((resolve, reject) => {
      // buffer: true results in the returned result being a buffer rather than a stream
      this._node.files.stat('/services/'+name+'/', (newServiceDirErr, newServiceDirRes) => {
                        if (newServiceDirErr || !newServiceDirRes) {
                          reject(new Error("ipfs add error" + newServiceDirErr + newServiceDirRes));
                        } else {
                          resolve(newServiceDirRes.Hash);
                        }
                      });

      // this.node.name.resolve(this._nodeId+"/"+name, (err, res) => {
      //   if (err || !res) {
      //     console.error('ipns resolve error', err, res);
      //     reject(err);
      //   }
        
      //   let path:string = res.Path;
      //   let cutter:string="/ipfs/";
      //   let hash:string=path.substring(cutter.length-1);

        
      // });
    });
    return promise;
  }

  /*
   *************************************************
   * Helper
   * ***********************************************
   */
  private static Utf8ArrayToStr(array): string {
    let out, i, len, c;
    let char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  }
}
