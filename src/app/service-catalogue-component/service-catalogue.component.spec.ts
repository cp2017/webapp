/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { ServiceCatalogueComponent } from './service-catalogue.component';
import {ServiceRepositoryService} from "../services/service-repository/service-repository.service";
import {IpfsService} from "../services/ipfs/ipfs.service";
import {EthereumService} from "../services/ethereum/ethereum.service";
import {ServiceFilterPipe} from "../pipes/service-filter.pipe";
import {SpinnerComponent} from "../directives/spinner/spinner.component";

describe('ServiceCatalogueComponent', () => {
  let component: ServiceCatalogueComponent;
  let fixture: ComponentFixture<ServiceCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'service-details/:service', component: DummyServiceDetails
          }
        ])
      ],
      declarations: [
        ServiceCatalogueComponent,
        ServiceFilterPipe,
        SpinnerComponent
      ],
      providers: [ServiceRepositoryService, IpfsService, EthereumService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCatalogueComponent);
    component = fixture.componentInstance;
    spyOn(component, "ngOnInit");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});

/*
  Dummy endpoint to receive routing from RouterTestingModule
 */

class DummyServiceDetails {
  private sub: any;
  constructor(private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {});
  }
}
