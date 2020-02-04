import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { IssueDescriptionComponent } from './issue-description/issue-description.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [SearchComponent, IssueDescriptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxPaginationModule,
    AngularEditorModule,
    SharedModule,
    CookieModule.forChild(),
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'search/:text',component:SearchComponent},
      {path:'issueDescription/:view',component:IssueDescriptionComponent}
    ])
  ]
  
})
export class IssueModule { }
