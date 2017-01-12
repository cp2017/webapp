/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ConsumeMicroservicesServiceService} from './consume-microservices.service';
import {IpfsService} from "../ipfs/ipfs.service";
import {EthereumService} from "../ethereum/ethereum.service";

describe('ConsumeMicroservicesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumeMicroservicesServiceService, IpfsService, EthereumService]
    });

    // UserService from the root injector
    let ipfsService = TestBed.get(IpfsService);
    // EthereumService from the root injector
    let ethereumService = TestBed.get(EthereumService);
  });

  it('should ...', inject([ConsumeMicroservicesServiceService], (service: ConsumeMicroservicesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
