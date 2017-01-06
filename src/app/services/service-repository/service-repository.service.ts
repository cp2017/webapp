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
        console.log('ipfs + ethereum : ok')
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
          this._ipfsService.getFromIpfs(serviceHash).then(ipfsServiceFile => {
            let serviceObj = JSON.parse(ipfsServiceFile);
            let mService: Microservice = new Microservice(serviceObj._name, serviceObj._description, serviceObj._hashToSwaggerFile);
            mService.id = serviceHash;
            microservices.push(mService);
            console.log(mService.id + ", " + serviceObj._name + ", " + serviceObj._description + ", " + serviceObj._hashToSwaggerFile);
          }).catch(err => {
            reject(err);
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
   * Gets the service metadata and ownership information for one service specified by the given hash.
   * TODO
   * @param hash The hash of the service that we want to receive
   * @returns {Promise<T>}
   */
  getService(hash: string): Promise<any> {
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
}
