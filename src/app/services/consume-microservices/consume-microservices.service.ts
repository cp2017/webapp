import {Injectable} from '@angular/core';
import {Microservice} from "../entities/microservice";
import {IpfsService} from "../ipfs/ipfs.service";
import {EthereumService} from "../ethereum/ethereum.service";
import {ServiceSubscription} from "../entities/serviceSubscription";
import {ContractProviderService} from "../contract-provider/contract-provider.service";

@Injectable()
export class ConsumeMicroservicesServiceService {

  constructor(private _ipfsService: IpfsService, private _ethereumService: EthereumService) {
  }

  consumeService(microservice: Microservice): Promise<ServiceSubscription> {
    return new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {

        // 0. Unlock the default ethereum account by calling the unlockAccount function of the ethereum service
        this._ethereumService.unlockDefaultAccount()
          .then(result => {
            console.log("Account unlocked: " + result);

            let transactionId = this._ethereumService.userContract.consumeService(microservice.serviceContractAddress, {
              gas: 10000000
            }, (consumeError, consumeSuccess) => {

              if (consumeError || !consumeSuccess) {
                reject(new Error("ethereum service consume error" + consumeError));
              } else {
                console.log(this._ethereumService.userContract);
                resolve(transactionId);
              }
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
}
