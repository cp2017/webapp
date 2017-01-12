/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {MyServicesComponent} from './my-services.component';
import {ServiceFilterPipe} from "../pipes/service-filter.pipe";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {EthereumService} from "../services/ethereum/ethereum.service";
import {IpfsService} from "../services/ipfs/ipfs.service";
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {ServiceDetailsComponent} from "../service-component/service-details-component/service-details.component";
import {SafePipe} from "../pipes/safe-url.pipe";
import {SpinnerComponent} from "../directives/spinner/spinner.component";

describe('MyServicesComponent', () => {
  let component: MyServicesComponent;
  let fixture: ComponentFixture<MyServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'service-details/:service', component: DummyServiceDetails
          }
        ])
      ],
      declarations: [MyServicesComponent, ServiceDetailsComponent, ServiceFilterPipe, SafePipe, SpinnerComponent],
      providers: [ServiceRepositoryService, IpfsService, EthereumService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
 Dummy endpoint to receive routing from RouterTestingModule
 */
class DummyServiceDetails {
  private sub: any;

  constructor(private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
    });
  }
}
