import {Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {Microservice} from "../services/entities/microservice";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  private myServices: Array<Microservice>;
  private subscribedServices: Array<Microservice>;

  constructor(private _serviceRepositoryService: ServiceRepositoryService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setUpLocalChangeDetector();
    this._serviceRepositoryService.getAllMyServicesByIpns()
      .then(services => this.requestMyServicesSuccess(services))
      .catch(err => this.requestMyServicesError(err));
  }

  private requestMyServicesSuccess(services: Array<Microservice>) {
    console.log("My services:");
    console.log(services);
    this.myServices = services;
  }

  private requestMyServicesError(err: any) {
    alert(err);
    console.log(err);
  }

  /**
   * Manually extend the component's change detector and doing a local check every 500 milliseconds.
   */
  private setUpLocalChangeDetector(): void {
    let interval = setInterval(() => {
      try {
        this.ref.detectChanges();
      } catch (err) {
        clearInterval(interval);
      }
    }, 500);
  }
}
