import {Component, OnInit, Input} from '@angular/core';
import {ServiceRepositoryService} from "../../services/service-repository/service-repository.service";
import {Microservice} from "../../services/entities/microservice";

@Component({
  selector: 'service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  @Input('serviceHash') serviceHash: string;
  private _baseUrl: string = "http://petstore.swagger.io";
  private _swaggerUrl: string;
  private _url: string;
  private _service: Microservice;

  constructor(private _serviceRepositoryService: ServiceRepositoryService) {
    this._service = new Microservice("", "", "");
    this._swaggerUrl = "http://your-url-here.com";
    this.buildUrl();
  }

  buildUrl() {
    this._url = this._baseUrl + "?url=" + this._swaggerUrl;
  }

  ngOnInit() {
    console.log(this.serviceHash);

    if (!this.serviceHash) {
      return;
    }
    this._serviceRepositoryService.getServiceByIpfs(this.serviceHash).then(service => {
      this._service = service;
      this._swaggerUrl = "https://ipfs.io/ipfs/" + this._service.hashToSwaggerFile;
      this.buildUrl();
    }).catch(err => {
      // TODO Do something with the error
      console.log(err);
    });
    this._service = this._serviceRepositoryService.getMicroserviceById(this.serviceHash);


  }

  public get url(): string {
    return this._url;
  }

  public get swaggerUrl(): string {
    return this._swaggerUrl;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  public get service(): Microservice {
    return this._service;
  }

}
