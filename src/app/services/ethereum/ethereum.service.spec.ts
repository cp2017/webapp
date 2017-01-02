/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {EthereumService} from './ethereum.service';


describe('EthereumService', () => {

  let ETHEREUM_CLIENT_ADDRESS = "http://localhost:8545";


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EthereumService]
    });
  });

  it('should be created without a connection in the beginning', inject([EthereumService], (service: EthereumService) => {
    expect(service).toBeTruthy();
    expect(service.web3).toBe(null);
  }));

  it('should create a connection to the locally running Ethereum client with address ' + ETHEREUM_CLIENT_ADDRESS,
    async(inject([EthereumService], (service: EthereumService) => {
      let resolved: boolean = false;


      let promise = service.initWeb3(ETHEREUM_CLIENT_ADDRESS)
        .then(
          web3Ethereum => {
            resolved = true;
            // We do expect the connection
            expect(web3Ethereum).toBeTruthy();
            // Check if connection is established by asking for the ethereum client version
            expect(typeof web3Ethereum.version.node).toEqual('string');
            // Check if the default account is set
            expect(typeof web3Ethereum.eth.defaultAccount === 'undefined').toBeFalsy();
          })
        .catch(err => {
            resolved = true;
            // We don't expect an error
            expect(err).toBeUndefined();
          }
        );

      // Test whether it is a promise
      expect(promise).toEqual(jasmine.any(Promise));

      // Wait two seconds and check whether the promise is resolved
      setTimeout(() => {
        expect(resolved).toBeTruthy();
      }, 2000);
    })));
});
