import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { DevicesComponent } from './devices/devices.component';
import { CommunitiesComponent } from './communities/communities.component';
import { NetworksComponent } from './networks/networks.component';
import { UsersComponent } from './users/users.component';
import { RapidRespondersComponent } from './rapid-responders/rapid-responder.component';
import { DeviceListComponent } from './dashboard/device-list/device-list.component';
import { AlarmDetailsComponent } from './dashboard/alarm-details/alarm-details.component';
import { DoorbellDetailsComponent } from './dashboard/doorbell-details/doorbell-details.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './login/auth-guard.service';

const routes: Routes = [
 
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'communities', component: CommunitiesComponent },
      { path: 'networks', component: NetworksComponent },
      { path: 'users', component: UsersComponent },
      { path: 'rapid_responders', component: RapidRespondersComponent },
      { path: 'device_list', component: DeviceListComponent },
      { path: 'device_alarm_details', component: AlarmDetailsComponent },
      { path: 'doorbell_details', component: DoorbellDetailsComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
