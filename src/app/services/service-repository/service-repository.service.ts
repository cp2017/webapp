import {Injectable} from '@angular/core';
import {IpfsService} from "../ipfs/ipfs.service";
import {EthereumService} from "../ethereum/ethereum.service";
import {Microservice} from "../entities/microservice";
import {ContractProviderService} from "../contract-provider/contract-provider.service";
import multihash from "multi-hash";

@Injectable()
export class ServiceRepositoryService {

  private localServiceList: Microservice[];
  private localConsumedServiceList: Microservice[];

  private _serviceRegistryContract: any;

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
  registerService(name: string, description: string, swaggerJson: string, publicKey: string, price: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {

        // 0. Unlock the default ethereum account by calling the unlockAccount function of the ethereum service
        this._ethereumService.unlockDefaultAccount()
          .then(result => {
            console.log("Account unlocked");

            let microserviceObject: Microservice = new Microservice(name, description);
            microserviceObject.publicKey = publicKey;
            microserviceObject.price = price;

            // 1. Deploy Service contract
            this._ethereumService.deployContract(ContractProviderService.SERVICE_CONTRACT_ABI, ContractProviderService.SERVICE_CONTRACT_BINARY)
              .then(contractAddress => {
                console.log("Step 1 succeeded: New contract for the service deployed " + contractAddress);
                // Storing the contract address in the metadata
                microserviceObject.serviceContractAddress = contractAddress;

                let serviceContract = this._ethereumService.web3.eth.contract(ContractProviderService.SERVICE_CONTRACT_ABI)
                  .at(contractAddress);
                serviceContract.setPrice(microserviceObject.price);
                serviceContract.setPublicKey(microserviceObject.publicKey);
                microserviceObject.serviceContract = serviceContract;
                console.log(serviceContract);

                // 2. Add metadata and swagger description to IPFS
                this._ipfsService.putServiceToIpfs(microserviceObject, swaggerJson).then(ipfsFile => {
                  console.log("Step 2 succeeded: Service added to IPFS:");
                  console.log(ipfsFile);
                  let serviceHash = ipfsFile.Hash;

                  // 3. Call the service registry contract to register that service
                  // console.log("0x" + multihash.decode(serviceHash).toString("hex"));
                  let result = this.serviceRegistryContract.register("0x" + multihash.decode(serviceHash).toString("hex"), {gas: 4000000});
                  // Also store the ipfs hash in the service contract that was just deployed
                  serviceContract.setIpfsHash("0x" + multihash.decode(serviceHash).toString("hex"), {gas: 4000000});

                  console.log("Step 3 succeeded: Ethereum transaction id " + result);

                  // 4. Done
                  resolve(serviceHash);

                }).catch(err => {
                  reject(err);
                });

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
   * TODO: Implement a service that provides the functionality to updata a specific microservice
   * @param name
   * @param description
   * @param swaggerJson
   * @param price
   * @returns {Promise<T>}
   */
  updateService(name: string, description: string, swaggerJson: string, price: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
        // 0. Unlock the default ethereum account by calling the unlockAccount function of the ethereum service
        this._ethereumService.unlockDefaultAccount()
          .then(result => {
            console.log("Account unlocked");
            // 1. Get the current version of the service
            // TODO
            // 2. Replace the service in the IPFS file system and publish it
            // TODO
            // 3. Call the ethereum contract to update that service in the blockchain
            // TODO
            // 4. Resolve
            // TODO
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


  private get serviceRegistryContract(): any {
    if (!this._serviceRegistryContract) {
      this._serviceRegistryContract = this._ethereumService.web3.eth.contract(ContractProviderService.REGISTRY_CONTRACT_ABI)
        .at(ContractProviderService.REGISTRY_CONTRACT_ADDRESS);
    }
    return this._serviceRegistryContract;
  }


  /**
   * Returns all services that are registered at the marketplace
   * TODO
   * @returns {Promise<T>}
   */
  getAllServices(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let resolved = false;
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
        // 1. Get all hashes from the Blockchain

        let servicesCount = this.serviceRegistryContract.servicesCount();
        let serviceHashList: string[] = [];
        for (let i = 1; i <= servicesCount; i++) {
          serviceHashList.push(multihash.encode(this.serviceRegistryContract.services(i)));
        }
        console.log('ServicesCount ' + servicesCount);
        console.log('serviceHashList ' + serviceHashList.length);


        //let serviceHashList: string[] = ["Qmc33Sjp9xzRW5zbXPhUQCBfuFSqckuYkYN1nD7btSeYjq",
        //"Qmem6Dv6pVjXLXcw8gKUqWHycSo8r63gLyeMVBxeGxBbYd"];

        let allMicroserviceVersions: Microservice[] = [];
        let ipnsURIList: String[] = [];
        let microservices: Microservice[] = [];
        for (let serviceHash of serviceHashList) {
          this.getServiceByIpfs(serviceHash)
            .then((mService: Microservice) => {
              allMicroserviceVersions.push(mService);
              if (ipnsURIList.indexOf(mService.IPNS_URI) == -1) {
                console.log("IPNS URI:" + mService.IPNS_URI);
                ipnsURIList.push(mService.IPNS_URI);
                this.getServiceByIpnsUri(mService.IPNS_URI)
                  .then((ipnsService: Microservice) => {
                    microservices.push(ipnsService);
                    if (!resolved) {
                      this.localServiceList = microservices;
                      resolve(microservices);
                    }
                  });
              }
              console.log(mService);
            })
            .catch(microserviceErr => {
              reject(microserviceErr);
            });
        }
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
              // 2.2 Store the multihash addresses of the metadata.json and the swagger.json
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
                          mService.IPNS_URI = serviceObj._IPNS_URI;
                          mService.publicKey = serviceObj._publicKey;
                          mService.id = hash;
                          mService.serviceContractAddress = serviceObj._serviceContractAddress;
                          mService.serviceContract = this._ethereumService.web3.eth.contract(ContractProviderService.SERVICE_CONTRACT_ABI)
                            .at(mService.serviceContractAddress);
                          mService.price = mService.serviceContract.servicePrice();
                          mService.balance = this._ethereumService.web3.eth.getBalance(mService.serviceContractAddress);
                          mService.numberConsumers = mService.serviceContract.usersCount();


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
   * Fetches of the ethereum user consumed services by getting the ipfs hashes
   * from the blockchain and then getting the microservices metadata from IPFS.
   * @returns {Promise<T>} Returns a promise that resolves a list of microservices
   */
  public getConsumedServices(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {

        // 1. Get all the service contracts of the consumed services
        let consumedServicesCount = this._ethereumService.userContract.consumedServicesCount();
        let consumedServiceContractList: any[] = [];
        for (let i = 1; i <= consumedServicesCount; i++) {
          let serviceContractAddress = this._ethereumService.userContract.consumedServices(i);
          let serviceContract = this._ethereumService.web3.eth.contract(ContractProviderService.SERVICE_CONTRACT_ABI).at(serviceContractAddress);
          consumedServiceContractList.push(serviceContract);
        }

        // 2. Get the ipfs address from the service contracts
        let consumedServiceIpfsHashList: any[] = [];
        for (let serviceContract of consumedServiceContractList) {
          consumedServiceIpfsHashList.push(multihash.encode(serviceContract.ipfsHash()));
        }

        // 3. Get the services from IPFS using the ipfs addresses from the service contracts
        let microservices: Microservice[] = [];
        for (let serviceHash of consumedServiceIpfsHashList) {
          this.getServiceByIpfs(serviceHash)
            .then((mService: Microservice) => {
              microservices.push(mService);
              console.log(mService);
            })
            .catch(microserviceErr => {
              reject(microserviceErr);
            });
        }
        this.localConsumedServiceList = microservices;
        resolve(microservices);
      } else {
        reject(new Error("You have to connect to the IPFS and Ethereum networks first first!"));
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
        this._ipfsService.node.name.resolve(this._ipfsService.nodeId, (ipnsErr, ipnsRes) => {
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
   * Gets the service metadata and ownership information for one service specified by the given IPNS URI.
   * @param ipnsUri The IPNS URI of the service that we want to receive
   * @returns {Promise<T>}
   */
  getServiceByIpnsUri(ipnsUri: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {
        this._ipfsService.getFromIpns(ipnsUri).then(hash => {
          this.getServiceByIpfs(hash).then(service => {
            resolve(service);
          });
        });
      } else {
        reject(new Error("You have to connect to the IPFS and Ethereum networks first first!"));
      }
    });
    return promise;
  }
}
