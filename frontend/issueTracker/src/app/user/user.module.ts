import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [SignupComponent, LoginComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CookieModule.forChild(),
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
      {path:'dashboard',component:DashboardComponent}
    ])
  ]
})
export class UserModule { }
