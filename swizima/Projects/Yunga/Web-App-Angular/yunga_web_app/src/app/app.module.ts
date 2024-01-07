import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';
import { MatWidgetsModule } from './mat-widgets/mat-widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './footer/footer.component';
import { DetailViewerComponent } from './detail-viewer/detail-viewer.component';
import { MainComponent } from './main/main.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { DevicesComponent } from './devices/devices.component';
import { CommunitiesComponent } from './communities/communities.component';
import { NetworksComponent } from './networks/networks.component';
import { UsersComponent } from './users/users.component';
import { RapidRespondersComponent } from './rapid-responders/rapid-responder.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerPopupComponent } from './customers/popups/customer-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DevicePopupComponent } from './devices/popups/device-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { CommunitiesPopupComponent } from './communities/popups/communities-popup.component';
import { NetworksPopupComponent } from './networks/popups/networks-popup.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src';
import more from 'highcharts/highcharts-more.src';
import { MatButton } from '@angular/material/button';
import { DeviceListComponent } from './dashboard/device-list/device-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlarmDetailsComponent } from './dashboard/alarm-details/alarm-details.component';
import { DoorbellDetailsComponent } from './dashboard/doorbell-details/doorbell-details.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { AuthGuard } from './login/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DetailViewerComponent,
    MainComponent,
    SideNavComponent,
    DashboardComponent,
    CustomersComponent,
    DevicesComponent,
    CommunitiesComponent,
    NetworksComponent,
    UsersComponent,
    RapidRespondersComponent,
    CustomerPopupComponent,
    DevicePopupComponent,
    CommunitiesPopupComponent,
    NetworksPopupComponent,
    DeviceListComponent,
    AlarmDetailsComponent,
    DoorbellDetailsComponent,
    LoginComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatWidgetsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ChartModule,
    MatDatepickerModule,
    HttpClientModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase))

  ],
  providers: [

    ScreenTrackingService, UserTrackingService,AuthGuard,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
