/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceRepositoryService } from './service-repository.service';
import {IpfsService} from "../ipfs/ipfs.service";
import {EthereumService} from "../ethereum/ethereum.service";

describe('ServiceRepositoryService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceRepositoryService, IpfsService, EthereumService]
    });

    // UserService from the root injector
    let ipfsService = TestBed.get(IpfsService);
    // EthereumService from the root injector
    let ethereumService = TestBed.get(EthereumService);

  });

  it('should ...', inject([ServiceRepositoryService], (service: ServiceRepositoryService) => {
    //TODO
    expect(service).toBeTruthy();
  }));
});
