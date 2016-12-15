import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: 'service-details.component.html',
  styleUrls: ['service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {

    private _baseUrl: string = "http://petstore.swagger.io";
    private _swaggerUrl: string;
    private _url: string;
    private sub: any;

  constructor(private route: ActivatedRoute) {
      this._swaggerUrl = "http://your-url-here.com";
      this.buildUrl();
  }

  buildUrl(){
      this._url = this._baseUrl + "?url=" + this._swaggerUrl;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this._swaggerUrl = "https://ipfs.io/ipfs/" + params["hash"]; // (+) converts string 'id' to a number
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
}
