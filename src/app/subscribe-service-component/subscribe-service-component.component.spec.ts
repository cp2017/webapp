/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SubscribeServiceComponentComponent} from './subscribe-service-component.component';
import {SpinnerComponent} from "../directives/spinner/spinner.component";
import {ConsumeMicroservicesServiceService} from "../services/consume-microservices/consume-microservices.service";
import {IpfsService} from "../services/ipfs/ipfs.service";
import {EthereumService} from "../services/ethereum/ethereum.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MockActivatedRoute} from "../services/mocks/mock-activated-route.service";
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {ServiceDetailsComponent} from "../service-component/service-details-component/service-details.component";
import {SafePipe} from "../pipes/safe-url.pipe";

describe('SubscribeServiceComponentComponent', () => {
  let component: SubscribeServiceComponentComponent;
  let fixture: ComponentFixture<SubscribeServiceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, FormsModule
      ],
      declarations: [SubscribeServiceComponentComponent, SpinnerComponent, ServiceDetailsComponent, SafePipe],
      providers: [
        ServiceRepositoryService,
        ConsumeMicroservicesServiceService,
        IpfsService,
        EthereumService,
        {
          provide: ActivatedRoute, useClass: MockActivatedRoute
        }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeServiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
