import {Injectable} from '@angular/core';
import {Microservice} from "../entities/microservice";
import {IpfsService} from "../ipfs/ipfs.service";
import {EthereumService} from "../ethereum/ethereum.service";
import {ServiceSubscription} from "../entities/serviceSubscription";
import {ContractProviderService} from "../contract-provider/contract-provider.service";

@Injectable()
export class ConsumeMicroservicesServiceService {

  private consumedServices: Microservice[];

  constructor(private _ipfsService: IpfsService, private _ethereumService: EthereumService) {
  }


  consumeService(microservice: Microservice, consumerPublicKey: string): Promise<ServiceSubscription> {
    return new Promise((resolve, reject) => {
      if (this._ipfsService.node != null && this._ethereumService.web3 != null) {

        // 0. Unlock the default ethereum account by calling the unlockAccount function of the ethereum service
        this._ethereumService.unlockDefaultAccount()
          .then(result => {
            console.log("Account unlocked");
            // TODO do the subscription: call the corresponding service contract

            let transactionId = this._ethereumService.userContract.consumeService(microservice.serviceContractAddress, {
              gas: 70000000
            });

            console.log(transactionId);
            console.log(this._ethereumService.userContract);

            resolve(transactionId);
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
