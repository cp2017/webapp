import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
import {Microservice} from "../services/entities/microservice";
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";

@Component({
  selector: 'app-service-registration-component',
  templateUrl: './service-registration.component.html',
  styleUrls: ['./service-registration.component.css']
})
export class ServiceRegistrationComponent implements OnInit, AfterViewInit{


  private newServiceHashAddress: string;
  private name: string;
  private description: string;
  private swaggerJson: string;
  private price:number;
  private servicePublicKey: string;
  private service:Microservice;
  private loading:boolean = false;

  constructor(private _serviceRepositoryService: ServiceRepositoryService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.initInputElement();
  }

  private registerNewService() {
    this.loading = true;
    this._serviceRepositoryService.registerService(this.name, this.description, this.swaggerJson, this.servicePublicKey, this.price)
      .then(serviceHash => this.registrationSuccess(serviceHash))
      .catch(err => this.registrationError(err));
  }

  private registrationSuccess(serviceHash: string) {
    // Service was registered successfully with IPFS and Ethereum

    this.description = "";
    this.name = "";
    $('#swaggerJson').val('');

    this.newServiceHashAddress = serviceHash;

    this._serviceRepositoryService.getServiceByIpfs(serviceHash)
      .then(service => this.getServiceSuccess(service))
      .catch(err => this.getServiceError(err));
  }

  private registrationError(err: any) {
    // Service registration with IPFS and Ethereum failed
    // TODO display the error on the UI
    console.log(err);
    alert(err);
    this.loading = false;
  }

  private getServiceSuccess(service: Microservice) {
    this.service = service;
    console.log(service);
    this.loading = false;
  }

  private getServiceError(err) {
    // TODO display the error on the UI
    console.log(err);
    this.loading = false;
  }

  /*
   *************************************
   * Helper
   * ***********************************
   */
  private initInputElement() {
    let swaggerInput: HTMLInputElement = <HTMLInputElement> document.getElementById('swaggerJson');
    swaggerInput.addEventListener('change', (e) => {
      let file = swaggerInput.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.swaggerJson = reader.result;
      };
      if (typeof file !== "undefined") {
        reader.readAsText(file);
      }
    });
  }
}
