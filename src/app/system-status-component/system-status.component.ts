import {Component, OnInit} from '@angular/core';
import {IpfsService} from "../services/ipfs/ipfs.service";
import {EthereumService} from "../services/ethereum/ethereum.service";

@Component({
  selector: 'app-system-status',
  templateUrl: 'system-status.component.html',
  styleUrls: ['system-status.component.css']
})
export class SystemStatusComponent implements OnInit {

  // IPFS
  private ipfsNode: any = null;
  private agentVersion: string = null;
  private protocolVersion: string = null;
  private daemonId: string = null;
  private ipfsDaemonStarted: boolean = false;
  private ipfsMultiaddr: string = "/ip4/127.0.0.1/tcp/5001";

  // Ethereum
  private web3Version: string = null;
  private ethereumClientVersion: string = null;
  private ethereumNetworkProtocolVersion: string = null;
  private ethereumVersion: string = null;
  private ethereumProvider: string = "http://localhost:8545";
  private ethereumPassword: string = "";

  // Example contract
  private testContract: any = null;
  private testContractAddress: any;
  private testContractStatus: any;
  private testContractParam: number;
  private testContractResult: any;

  // Ethereum user contract
  private editUserFormOpen:boolean = false;
  private userContractBalance:number;
  private userContractPublicKey:string;
  private addToUserFund: number;
  private newConsumerPublicKey: string;
  private defaultAccountBalance: string;

  constructor(private _ipfsService: IpfsService, private _ethereumService: EthereumService) {
  }

  ngOnInit() {
    if (this._ethereumService.web3 != null) {
      // if already connected, this method return the already connected instance
      this.onEthereumConnectClick();
    }
    if (this._ipfsService.node != null) {
      // if already connected, this method return the already connected instance
      this.onIpfsConnectClick();
    }
  }

  private onEthereumConnectClick() {
    this._ethereumService.initWeb3(this.ethereumProvider, this.ethereumPassword).then(web3Ethereum => {
      this.web3Version = web3Ethereum.version.api;
      this.ethereumClientVersion = web3Ethereum.version.node;
      this.ethereumNetworkProtocolVersion = web3Ethereum.version.network;
      this.ethereumVersion = web3Ethereum.version.ethereum;
      if (this._ethereumService.userContract) {
        this.updateUserContractInfo();
      }
    });
  }

  private updateUserContractInfo():void {
    this.userContractBalance = this._ethereumService.userContract.eth();
    // TODO The returned format from the contract is not casted to a plain javascript string
    this.userContractPublicKey = this._ethereumService.userContract.publicKey();
    this.defaultAccountBalance = this._ethereumService.getBalanceDefaultAccount().toString();
  }

  private onIpfsConnectClick() {
    this._ipfsService.connectIpfsDeamon(this.ipfsMultiaddr).then(node => {
      this.ipfsDaemonStarted = true;
      this.ipfsNode = node;
      node.id().then(version => {
        this.agentVersion = "js-ipfs/" + version.agentVersion;
        this.protocolVersion = version.protocolVersion;
        this.daemonId = version.id;
      });
    });
  }

  private callTestContract() {
    this._ethereumService.callTestContract(this.testContractParam).then(result => {
      this.testContractResult = result;
    }).catch(err => {
      console.error(err);
    });
  }

  private createTestContract() {
    this._ethereumService.createTestContract().then(contract => {
      this.testContractStatus = "Mined!";
      this.testContractAddress = contract.address;
      this.testContract = contract;
    }).catch(err => {
      console.error(err);
    });
  }

  private editUserAccount() {
    this._ethereumService.editUserAccount(this.addToUserFund, this.newConsumerPublicKey).then(userContract => {
      console.log("User successfully updated");
      console.log(userContract);
      this.updateUserContractInfo();
      this.editUserFormOpen = false;
    }).catch(err => {
      // TODO: Do something with this error (show it on the UI)
      alert(err);
      console.log(err);
    });
  }

  private editUserForm() {
    this.editUserFormOpen = true;
  }
}
