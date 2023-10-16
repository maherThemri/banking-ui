import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LightInfoComponent } from './components/light-info/light-info.component';
import { MyTransactionsComponent } from './pages/my-transactions/my-transactions.component';
import { MyContactListComponent } from './pages/my-contact-list/my-contact-list.component';
import { NewTransactionComponent } from './pages/new-transaction/new-transaction.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainAdminPageComponent } from './admin/main-admin-page/main-admin-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ChartsModule } from 'ng2-charts';
import { DatepickerModule } from 'ng2-datepicker';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    UserDashboardComponent,
    LightInfoComponent,
    MyTransactionsComponent,
    MyContactListComponent,
    NewTransactionComponent,
    NewContactComponent,
    ProfileComponent,
    ManageUsersComponent,
    MainPageComponent,
    MainAdminPageComponent,
    AdminDashboardComponent,
    ConfirmRegisterComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    ChartsModule,
    DatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
