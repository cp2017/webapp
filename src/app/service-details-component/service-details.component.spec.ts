/* tslint:disable:no-unused-variable */
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

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ServiceDetailsComponent, SafePipe],
      providers: [ServiceRepositoryService, IpfsService, EthereumService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial url', () =>{
    expect(component.url).toContain(component.baseUrl);
    expect(component.url).toContain(component.swaggerUrl);
  }); 
});
