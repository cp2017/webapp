/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {IpfsService} from './ipfs.service';

describe('IpfsService', () => {

  let IPFS_DAEMON_ADDRESS = "/ip4/127.0.0.1/tcp/5001";

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [IpfsService]});
  });

  it('should be created without a connection in the beginning', inject([IpfsService], (service: IpfsService) => {
    expect(service).toBeTruthy();
    expect(service.node).toBe(null);
  }));

  it('should create a connection to the locally running IPFS daemon with address ' + IPFS_DAEMON_ADDRESS,
    async(inject([IpfsService], (service: IpfsService) => {
      let resolved: boolean = false;

      let promise = service.connectIpfsDeamon(IPFS_DAEMON_ADDRESS).then(
        value => {
          resolved = true;
          // We do expect the connection
          expect(value).toBeTruthy();
          // Check if connection is established by fetching the id of the IPFS daemon
          value.id()
            .then((id) => {
              expect(typeof id.id).toEqual('string');
            })
            .catch((err) => {
              // We don't expect an error
              expect(err).toBeUndefined();
            });
        }
      ).catch(err => {
          resolved = true;
          // We don't expect an error
          console.error(err.message);
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

  it('should put a value to IPFS',
    async(inject([IpfsService], (service: IpfsService) => {
      // connect to IPFS daemon
      service.connectIpfsDeamon(IPFS_DAEMON_ADDRESS).then(
        ipfsApi => {
          let resolved: boolean = false;

          let promise = service.putToIpfs("testvalue").then(
            ipfsFile => {
              resolved = true;
              // We do expect an IPFS file with a path
              expect(typeof ipfsFile.path).toEqual('string');


            }
          ).catch(err => {
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
        }
      );
    })));


  it('should put a value to IPFS and then get the same value back',
    async(inject([IpfsService], (service: IpfsService) => {
      let resolved: boolean = false;

      // connect to IPFS daemon
      service.connectIpfsDeamon(IPFS_DAEMON_ADDRESS).then(
        ipfsApi => {
          service.putToIpfs("testvalue").then(
            ipfsFile => {
              // We do expect an IPFS file with a path
              expect(typeof ipfsFile.path).toEqual('string');

              let promise = service.getFromIpfs(ipfsFile.hash).then(
                string => {
                  resolved = true;
                  // We do expect a string
                  expect(typeof string).toEqual('string');
                  expect(string).toBe('testvalue');

                }
              ).catch(err => {
                  resolved = true;
                  // We don't expect an error
                  expect(err).toBeUndefined();
                }
              );

              // Test whether it is a promise
              expect(promise).toEqual(jasmine.any(Promise));

            }
          )
        }
      );

      // Wait two seconds and check whether the promise is resolved
      setTimeout(() => {
        expect(resolved).toBeTruthy();
      }, 2000);
    })));
});
