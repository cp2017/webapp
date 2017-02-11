import {Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {Microservice} from "../services/entities/microservice";
declare var jQuery: any;

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  private myServices: Array<Microservice>;
  private subscribedServices: Array<Microservice>;
  private editService: Microservice;
  private loadingConsumed: boolean = false;
  private loadingMy: boolean = false;


  constructor(private _serviceRepositoryService: ServiceRepositoryService, private ref: ChangeDetectorRef) {


  }

  ngOnInit() {
    this.loadingMy = true;
    this.loadingConsumed = true;
    this.setUpLocalChangeDetector();
    this._serviceRepositoryService.getAllMyServicesByIpns()
      .then(services => this.requestMyServicesSuccess(services))
      .catch(err => this.requestMyServicesError(err));

    this._serviceRepositoryService.getConsumedServices()
      .then(services => this.requestConsumedServicesSuccess(services))
      .catch(err => this.requestConsumedServicesError(err));
  }

  private requestConsumedServicesSuccess(services: Array<Microservice>) {
    console.log("Consumed services:");
    console.log(services);
    this.subscribedServices = services;
    this.loadingConsumed = false;
  }

  private requestConsumedServicesError(err: any) {
    alert(err);
    console.log(err);
    this.loadingConsumed = false;
  }

  private requestMyServicesSuccess(services: Array<Microservice>) {
    console.log("My services:");
    console.log(services);
    this.myServices = services;
    this.loadingMy = false;
  }

  private requestMyServicesError(err: any) {
    alert(err);
    console.log(err);
    this.loadingMy = false;
  }

  private editServiceModal(microservice: Microservice): void {
    this.editService = microservice;
  }

  private cancleEdit(): void {
    this.editService = null;
  }

  /*
   *************** Helper *******************
   */
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
