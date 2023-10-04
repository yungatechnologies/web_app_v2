import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { DevicesComponent } from './devices/devices.component';
import { CommunitiesComponent } from './communities/communities.component';
import { NetworksComponent } from './networks/networks.component';
import { UsersComponent } from './users/users.component';
import { RapidRespondersComponent } from './rapid-responders/rapid-responder.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'communities', component: CommunitiesComponent },
  { path: 'networks', component: NetworksComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rapid_responders', component: RapidRespondersComponent }

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
