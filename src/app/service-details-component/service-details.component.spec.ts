/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ServiceDetailsComponent } from './service-details.component';
import { SafePipe } from "../pipes/safe-url.pipe";
import { MockActivatedRoute } from '../services/mocks/mock-activated-route.service';

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailsComponent, SafePipe],
      providers: [ActivatedRoute],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.overrideComponent(ServiceDetailsComponent, {
      set: {
        providers: [
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute
          }
        ]
      }
    }).createComponent(ServiceDetailsComponent);
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
