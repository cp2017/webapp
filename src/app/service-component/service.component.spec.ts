/* tslint:disable:no-unused-variable */
import {Observable} from 'rxjs/Rx';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {ServiceComponent} from './service.component';
import {SafePipe} from "../pipes/safe-url.pipe";
import {ServiceRepositoryService} from '../services/service-repository/service-repository.service';
import {EthereumService} from "../services/ethereum/ethereum.service";
import {IpfsService} from "../services/ipfs/ipfs.service";
import {ServiceDetailsComponent} from "./service-details-component/service-details.component";
import {MockActivatedRoute} from "../services/mocks/mock-activated-route.service";
import {MockServiceRepositoryService} from "../services/mocks/mock-service-repository.service";

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ServiceComponent, ServiceDetailsComponent, SafePipe],
      providers: [
        {
          provide: ServiceRepositoryService, useClass: MockServiceRepositoryService
        },
        IpfsService,
        EthereumService,
        {
          provide: ActivatedRoute, useClass: MockActivatedRoute
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    spyOn(component, "ngOnInit");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should initialize the variables', () => {
    expect(component.serviceHash).toBeDefined();
  });

});
