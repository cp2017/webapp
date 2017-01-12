import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {IpfsService} from "./services/ipfs/ipfs.service";
import {EthereumService} from "./services/ethereum/ethereum.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private _ipfsService: IpfsService, private _ethereumService: EthereumService) {
  }


  ngOnInit(): void {
    this.initViewNavigation();
    this._ethereumService.initWeb3().then(web3Ethereum => {
      console.log("Connected to Ethereum with the predefined address and password.")
    }).catch(err => {
      console.log("Could not automatically connect to Ethereum. Please go to System Status and change the addresses accordingly.")
    });

    this._ipfsService.connectIpfsDeamon().then(node => {
      console.log("Connected to IPFS with the predefined address.")
    }).catch(err => {
      console.log("Could not automatically connect to IPFS. Please go to System Status and change the addresses accordingly.")
    });
  }

  private initViewNavigation():void {
    $(document).ready(function(){
      $('[data-toggle="offcanvas"]').click(function(){
        $("#navigation").toggleClass("hidden-xs");
      });
    });
  }
}
