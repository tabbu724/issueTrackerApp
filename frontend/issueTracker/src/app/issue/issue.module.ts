import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { IssueDescriptionComponent } from './issue-description/issue-description.component';



@NgModule({
  declarations: [SearchComponent, IssueDescriptionComponent],
  imports: [
    CommonModule
  ]
})
export class IssueModule { }
