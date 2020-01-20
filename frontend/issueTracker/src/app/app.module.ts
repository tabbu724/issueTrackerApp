import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from "@angular/router";
import { CookieModule } from "ngx-cookie";
import { ApiService } from './api.service';
import { SocketService } from './socket.service';
import { LoginComponent } from './user/login/login.component';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { IssueModule } from './issue/issue.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    SharedModule,
    IssueModule,
    RouterModule.forRoot(
     [
      {path:'login',component:LoginComponent},
      {path:'**',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'}
     ]
    ),
CookieModule.forRoot(),

  ],
  providers: [ApiService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
