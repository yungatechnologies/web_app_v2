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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomerPopupComponent } from './customers/popups/customer-popup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DevicePopupComponent } from './devices/popups/device-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { CommunitiesPopupComponent } from './communities/popups/communities-popup.component';
import { NetworksPopupComponent } from './networks/popups/networks-popup.component';

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
    NetworksPopupComponent
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
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase))
    
  ],
  providers: [
  
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
