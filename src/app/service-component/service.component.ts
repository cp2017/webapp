import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceDetailsComponent} from "./service-details-component/service-details.component";
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {Microservice} from "../services/entities/microservice";

@Component({
  selector: 'app-service',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css']
})
export class ServiceComponent implements OnInit {

  private _serviceHash: string = null;
  private _service: Microservice = null;

  constructor(private route: ActivatedRoute, private _serviceRepositoryService: ServiceRepositoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let serviceId = params["hash"];
      if (!serviceId) {
        return;
      } else {
        this._serviceHash = serviceId;
        this._serviceRepositoryService.getServiceByIpfs(this._serviceHash).then(service => {
          this._service = service;
        }).catch(err => {
          // TODO Do something with the error
          console.log(err);
        });
      }
    });
  }

  get serviceHash(): string {
    return this._serviceHash;
  }

  get service(): Microservice {
    return this._service;
  }
}
