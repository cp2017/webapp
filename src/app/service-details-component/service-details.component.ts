import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: 'service-details.component.html',
  styleUrls: ['service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {

    private baseUrl: string;
    private swaggerUrl: string;
    private url: string;
    private sub: any;

  constructor(private route: ActivatedRoute) {
      this.baseUrl = "http://petstore.swagger.io/";
      this.swaggerUrl = "http://your-url-here.com";
      this.buildUrl();
  }

  updateUrl(){
      //this.swaggerUrl = "http://localhost:8080/ipfs/QmTVYom5k8Q1XnRaWGeHmwAAcnjFcoAA6Yju6RqqsrznUG";
      this.swaggerUrl = "http://petstore.swagger.io/v2/swagger.json";
      this.buildUrl();
  }

  buildUrl(){
      this.url = this.baseUrl + "?url=" + this.swaggerUrl;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.swaggerUrl = "https://ipfs.io/ipfs/" + params["hash"]; // (+) converts string 'id' to a number
      this.buildUrl();
    });
  }

}
