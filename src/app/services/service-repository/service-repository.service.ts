import {Injectable} from '@angular/core';
import {IpfsService} from "../ipfs/ipfs.service";
import {EthereumService} from "../ethereum/ethereum.service";
import {Microservice} from "../entities/microservice";
import {ContractProviderService} from "../contract-provider/contract-provider.service";
import multihash from "multi-hash";

@Injectable()
export class ServiceRepositoryService {

  private localServiceList: Microservice[];

  constructor(private _ipfsService: IpfsService, private _ethereumService: EthereumService) {
  }

  /**
   * This method registers a service to the marketplace by putting the metadata to IPFS and the
   * ownership information to the blockchain.
   * @param name The service name
   * @param description The service description
   * @param swaggerJson The swagger description as a json string
   * @returns {Promise<T>} Returns a promise that resolves the service hash as soon as all the steps
   * are done and the service is registered.
   */
  registerService(name: string, description: string, swaggerJson: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {

        // 0. Unlock the default ethereum account by calling the unlockAccount function of the ethereum service
        this._ethereumService.unlockDefaultAccount()
          .then(result => {
            console.log("Account unlocked");

            let microserviceObject: Microservice = new Microservice(name, description, "");
            let metadataJson = JSON.stringify(microserviceObject);

            // 1. Add metadata and swagger description to IPFS
            this._ipfsService.putServiceToIpfs(metadataJson, swaggerJson, name).then(ipfsFile => {
              console.log("Step 1 succeeded: Service added to IPFS:");
              console.log(ipfsFile);
              let serviceHash = ipfsFile.Hash;

              // 2. Call the ethereum contract to register that service
              let registrationContract = this._ethereumService.web3.eth.contract(ContractProviderService.REGISTRY_CONTRACT_ABI)
                .at(ContractProviderService.REGISTRY_CONTRACT_ADDRESS);

              // console.log("0x" + multihash.decode(serviceHash).toString("hex"));
              let result = registrationContract.register("0x" + multihash.decode(serviceHash).toString("hex"));
              console.log("Step 2 succeeded: Ethereum transaction id " + result);

              // 3. Done
              resolve(serviceHash);
            }).catch(err => {
              reject(err);
            });
          })
          .catch(err => {
            console.error("Account unlock error: " + err);
            reject("Account unlock error: " + err);
          });
      } else {
        reject(new Error("You have to connect to the IPFS and Ethereum networks first!"));
      }
    });
  }

  /**
   * Returns all services that are registered at the marketplace
   * TODO
   * @returns {Promise<T>}
   */
  getAllServices(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
        console.log('ipfs + ethereum : ok');
        // TODO:
        // 1. Get all hashes from the Blockchain

        let serviceRegistery = this._ethereumService.web3.eth.contract(ContractProviderService.REGISTRY_CONTRACT_ABI)
          .at(ContractProviderService.REGISTRY_CONTRACT_ADDRESS);
        let servicesCount = serviceRegistery.servicesCount();
        let serviceHashList: string[] = [];
        for (let i = 1; i <= servicesCount; i++) {
          serviceHashList.push(multihash.encode(serviceRegistery.services(i)));
        }
        console.log('ServicesCount ' + servicesCount);
        console.log('serviceHashList ' + serviceHashList.length);


        //let serviceHashList: string[] = ["Qmc33Sjp9xzRW5zbXPhUQCBfuFSqckuYkYN1nD7btSeYjq",
        //"Qmem6Dv6pVjXLXcw8gKUqWHycSo8r63gLyeMVBxeGxBbYd"];

        let microservices: Microservice[] = [];
        for (let serviceHash of serviceHashList) {
          this.getServiceByIpfs(serviceHash)
            .then((mService:Microservice) => {
              microservices.push(mService);
              console.log(mService);
            })
            .catch(microserviceErr => {
              reject(microserviceErr);
            });
        }
        this.localServiceList = microservices;
        resolve(microservices);
      } else {
        reject(new Error("You have to connect to the IPFS and Ethereum networks first first!"));
      }
    });
    return promise;
  }

  /**
   * Gets the Microservice information for one service specified by the given IPFS hash (ID).
   * It first checks whether the Service is already in the local storage. If not, it gets it from IPFS.
   * @param hash The hash of the service that we want to receive
   * @returns {Promise<T>} Returns a promise that resolves the Microservice as soon as we get all the information
   * from IPFS or local storage.
   */
  getServiceByIpfs(hash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var mService: Microservice = null;
      // 1. Check whether the service we want to get is already in the local storage
      if (this.localServiceList != undefined) {
        mService = this.getMicroserviceById(hash);
      }
      if (mService != null) {
        resolve(mService);
      } else {

        // 2. If the service was not already in the local storage, get it from IPFS
        if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
          // 2.1 Get the directory of the service, that contains the metadata.json and the swagger.json
          this._ipfsService.node.object.get(hash, (err, res) => {
            if (err || !res) {
              reject(new Error("ipfs get service error" + err + res));
            } else {
              // 2.2 Store the multihash addresses to the metadata.json and the swagger.json
              let metadataMultihash: string;
              let swaggerMultihash: string;
              for (let link of res._links) {
                if (link._name == "metadata.json") {
                  metadataMultihash = link._multihash;
                } else if (link._name == "swagger.json") {
                  swaggerMultihash = link._multihash;
                }
              }

              // 2.3 Get the metadata.json and create the Microservice object
              this._ipfsService.node.object.stat(metadataMultihash, (metadataHashErr, metadataHashRes) => {
                if (metadataHashErr || !metadataHashRes) {
                  reject(new Error("ipfs get service error" + metadataHashErr + metadataHashRes));
                } else {
                  this._ipfsService.node.object.stat(swaggerMultihash, (swaggerHashErr, swaggerHashRes) => {
                    if (swaggerHashErr || !swaggerHashRes) {
                      reject(new Error("ipfs get service error" + swaggerHashErr + swaggerHashRes));
                    } else {
                      this._ipfsService.getFromIpfs(metadataHashRes.Hash)
                        .then(metadataRes => {
                          let serviceObj = JSON.parse(metadataRes);
                          mService = new Microservice(serviceObj._name, serviceObj._description, swaggerHashRes.Hash);
                          mService.id = hash;
                          resolve(mService);
                        })
                        .catch(metadataErr => {
                          reject(metadataErr);
                        });
                    }
                  });
                }
              });
            }
          });
        } else {
          reject(new Error("You have to connect to the IPFS and Ethereum networks first first!"));
        }
      }
    });
  }

  /**
   * Returns a Microservice specified by the given IPFS hash (id). It only checks the services that are already
   * stored locally, so if the service is not already in the local storage, please use the getServiceByIpfs(hash: string) method.
   * @param id The hash of the service that we want to receive
   * @returns {any} The Microservice object, or null if it was not found in local storage.
   */
  public getMicroserviceById(id: string): Microservice {
    let service: Microservice[] = this.localServiceList.filter(function (currService) {
      return currService.id == id;
    });
    if (service.length > 1) {
      console.error("filter returned more than one service with identical id!");
      return null;
    }
    return service ? service[0] : null;
  }


  /**
   * Gets all the services that are registered under the IPNS address of this node (which is the IPFS deamon ID of
   * the locally running daemon).
   * @returns {Promise<T>} Returns a promise that resolves a list of Microservice objects as soon as we could resolve
   * the IPNS address to an IPFS address and got all the Microservices.
   */
  getAllMyServicesByIpns(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
        // TODO: change the hardcoded IPNS hash
        this._ipfsService.node.name.resolve('Qmd2cxH6JMEdirw3WAYdRjPLd3GWLjWEFNreyw5Cy3Nh3Y', (ipnsErr, ipnsRes) => {
          if (ipnsErr || !ipnsRes) {
            reject(new Error("ipns resolve error" + ipnsErr + ipnsRes));
          } else {
            let servicesDirectoryHash: string = ipnsRes.Path.split('/ipfs/', 2)[1];
            this._ipfsService.node.object.get(servicesDirectoryHash, (err, res) => {
              if (err || !res) {
                reject(new Error("ipfs get services directory error" + err + res));
              } else {
                // serviceList needs to be var instead of let, so that the change detection in the components work
                var serviceList: Array<Microservice> = new Array<Microservice>();
                for (let link of res._links) {
                  this._ipfsService.node.object.stat(link._multihash, (statsErr, statsRes) => {
                    if (statsErr || !statsRes) {
                      reject(new Error("ipfs get services directory error" + statsErr + statsRes));
                    } else {
                      let serviceHash = statsRes.Hash;
                      this.getServiceByIpfs(serviceHash)
                        .then(myService => {
                          serviceList.push(myService);
                          console.log(serviceList);
                        })
                        .catch(myServiceErr => {
                            reject(myServiceErr);
                          }
                        );
                    }
                  });
                }
                resolve(serviceList);
              }
            });
          }
        });
      } else {
        reject(new Error("You have to connect to the IPFS and Ethereum networks first first!"));
      }
    });
    return promise;
  }

  /**
   * Gets the service metadata and ownership information for one service specified by the given IPNS address.
   * TODO
   * @param hash The hash of the service that we want to receive
   * @returns {Promise<T>}
   */
  getServiceByIpns(hash: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
        // TODO:
        // 1. Fetch the service metadata from IPFS for the given hash
        // (maybe get the owner from the blockchain)
        // 2. Done
        resolve("TODO");
      } else {
        reject(new Error("You have to connect to the IPFS and Ethereum networks first first!"));
      }
    });
    return promise;
  }
}
