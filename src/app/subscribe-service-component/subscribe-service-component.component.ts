import {Component, OnInit} from '@angular/core';
import {Microservice} from "../services/entities/microservice";
import {ActivatedRoute} from "@angular/router";
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {ConsumeMicroservicesServiceService} from "../services/consume-microservices/consume-microservices.service";
import {ServiceSubscription} from "../services/entities/serviceSubscription";

@Component({
  selector: 'app-subscribe-service-component',
  templateUrl: './subscribe-service-component.component.html',
  styleUrls: ['./subscribe-service-component.component.css']
})
export class SubscribeServiceComponentComponent implements OnInit {

  private loading: boolean = false;
  private serviceHash: string = null;
  private service: Microservice = null;
  private consumerPublicKey: string = null;

  constructor(private route: ActivatedRoute, private _serviceRepositoryService: ServiceRepositoryService, private _consumeMicroservicesService: ConsumeMicroservicesServiceService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let serviceId = params["hash"];
      if (!serviceId) {
        return;
      } else {
        this.serviceHash = serviceId;
        this._serviceRepositoryService.getServiceByIpfs(this.serviceHash).then(service => {
          this.service = service;
        }).catch(err => {
          // TODO Do something with the error
          console.log(err);
        });
      }
    });
  }

  consumeService() {
    this.loading = true;
    this._consumeMicroservicesService.consumeService(this.service, this.consumerPublicKey).then(serviceSubscription => {
      this.subscriptionSuccess(serviceSubscription);
    }).catch(err => {
      this.subscriptionError(err);
    })
  }

  subscriptionSuccess(serviceSubscription: ServiceSubscription): void {
    // TODO show a summary of the new subscription
    console.log(serviceSubscription);
  }

  subscriptionError(err): void {
    // TODO show error on UI
    alert(err);
    console.log(err);
  }
}
