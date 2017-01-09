/* tslint:disable:no-unused-variable */
import { Observable } from 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ServiceDetailsComponent } from './service-details.component';
import { SafePipe } from "../pipes/safe-url.pipe";
import { ServiceRepositoryService } from '../services/service-repository/service-repository.service';
import {EthereumService} from "../services/ethereum/ethereum.service";
import {IpfsService} from "../services/ipfs/ipfs.service";
import {MockActivatedRoute} from "../services/mocks/mock-activated-route.service";
import {MockServiceRepositoryService} from "../services/mocks/mock-service-repository.service";

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ServiceDetailsComponent, SafePipe],
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
    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;
    spyOn(component, "ngOnInit");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should initialize the variables', () =>{
    expect(component.url).toContain(component.baseUrl);
    expect(component.url).toContain(component.swaggerUrl);
    expect(component.service).toBeDefined();
  }); 

  it('should set the url according to routing parameter', () => {
    expect(component.service.id).toBeDefined("Expected service to have been found by routing parameter");
  });
});
