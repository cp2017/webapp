/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ServiceDetailsComponent} from './service-details.component';
import {SafePipe} from "../../pipes/safe-url.pipe";
import {ServiceRepositoryService} from "../../services/service-repository/service-repository.service";
import {IpfsService} from "../../services/ipfs/ipfs.service";
import {EthereumService} from "../../services/ethereum/ethereum.service";

import {MockServiceRepositoryService} from "../../services/mocks/mock-service-repository.service";
import {Microservice} from "../../services/entities/microservice";

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDetailsComponent, SafePipe],
      providers: [
        {
          provide: ServiceRepositoryService, useClass: MockServiceRepositoryService
        },
        IpfsService,
        EthereumService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;

    // pretend that it was wired to something that supplied a hero
    let expectedMicroservice = new Microservice('Test Name', 'Test description', 'somehash');
    component.service = expectedMicroservice;

    spyOn(component, "ngOnInit");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should initialize the variables', () => {
    expect(component.url).toContain(component.baseUrl);
    expect(component.url).toContain(component.swaggerUrl);
    expect(component.service).toBeDefined();
  });
});


