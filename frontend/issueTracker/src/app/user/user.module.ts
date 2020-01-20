import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [SignupComponent, LoginComponent, DashboardComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
