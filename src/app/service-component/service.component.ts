import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceDetailsComponent} from "./service-details-component/service-details.component";

@Component({
  selector: 'app-service',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css']
})
export class ServiceComponent implements OnInit {

  private serviceHash: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let serviceId = params["hash"];
      if (!serviceId) {
        return;
      }
      this.serviceHash = serviceId;
    });
  }
}
