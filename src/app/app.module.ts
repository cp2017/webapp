import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ServiceRegistrationComponent} from './service-registration-component/service-registration.component';
import {Routes, RouterModule} from "@angular/router";
import {SystemStatusComponent} from './system-status-component/system-status.component';
import {IpfsService} from "./services/ipfs/ipfs.service";
import {EthereumService} from "./services/ethereum/ethereum.service";
import {SafePipe} from './pipes/safe-url.pipe';
import {ServiceFilterPipe} from './pipes/service-filter.pipe';
import { ServiceCatalogueComponent } from './service-catalogue-component/service-catalogue.component';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import {ServiceComponent} from "./service-component/service.component";
import { MyServicesComponent } from './my-services-component/my-services.component';
import {ServiceRepositoryService} from "./services/service-repository/service-repository.service";
import { ServiceDetailsComponent } from './service-component/service-details-component/service-details.component';
import {SpinnerComponent} from "./directives/spinner/spinner.component";
import { SubscribeServiceComponentComponent } from './subscribe-service-component/subscribe-service-component.component';


const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'system-status', component: SystemStatusComponent},
  {path: 'register', component: ServiceRegistrationComponent},
  {path: 'catalogue', component: ServiceCatalogueComponent},
  {path: 'service-details/:hash', component: ServiceComponent},
  {path: 'my-services', component: MyServicesComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ServiceRegistrationComponent,
    SystemStatusComponent,
    ServiceComponent,
    SafePipe,
    ServiceFilterPipe,
    ServiceCatalogueComponent,
    DashboardComponent,
    MyServicesComponent,
    ServiceDetailsComponent,
    SpinnerComponent,
    SubscribeServiceComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [IpfsService, EthereumService, ServiceRepositoryService],
  bootstrap: [AppComponent]
})

export class AppModule {



}
