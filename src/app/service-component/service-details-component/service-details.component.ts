import {Component, OnInit, Input} from '@angular/core';
import {ServiceRepositoryService} from "../../services/service-repository/service-repository.service";
import {Microservice} from "../../services/entities/microservice";

@Component({
  selector: 'service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  @Input('service') service: Microservice;
  private _baseUrl: string = "http://petstore.swagger.io";
  private _swaggerUrl: string;
  private _url: string;

  constructor() {
    this.service = new Microservice("", "", "");
    this._swaggerUrl = "http://your-url-here.com";
    this.buildUrl();
  }

  buildUrl() {
    this._url = this._baseUrl + "?url=" + this._swaggerUrl;
  }

  ngOnInit() {
    if (this.service == null) {
      return;
    } else {
      this._swaggerUrl = "https://ipfs.io/ipfs/" + this.service.hashToSwaggerFile;
      this.buildUrl();
    }
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

}
