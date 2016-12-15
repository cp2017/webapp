import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServiceRepositoryService} from '../services/service-repository/service-repository.service';
import { Microservice } from '../services/entities/microservice';

@Component({
  selector: 'app-service-details',
  templateUrl: 'service-details.component.html',
  styleUrls: ['service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {

    private _baseUrl: string = "http://petstore.swagger.io";
    private _swaggerUrl: string;
    private _url: string;
    private _sub: any;
    private _service: Microservice;

  constructor(private route: ActivatedRoute, private _serviceRepositoryService: ServiceRepositoryService) {
      this._service = new Microservice("","","");
      this._swaggerUrl = "http://your-url-here.com";
      this.buildUrl();
  }

  buildUrl(){
      this._url = this._baseUrl + "?url=" + this._swaggerUrl;
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      console.log(params);
      let serviceId = params["hash"];
      if(!serviceId){
        return;
      }
      this._service = this._serviceRepositoryService.getMicroserviceById(serviceId);
      this._swaggerUrl = "https://ipfs.io/ipfs/" + this._service.hashToSwaggerFile;
      this.buildUrl();
    });
  }

  public get url() : string {
    return this._url;
  }

  public get swaggerUrl() : string {
    return this._swaggerUrl;
  }

  public get baseUrl() : string {
    return this._baseUrl;
  }

  public get service() : Microservice {
    return this._service;
  }
}
