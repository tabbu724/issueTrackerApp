import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { displayDate } from './display-date/display-date.pipe';



@NgModule({
  declarations: [displayDate],
  imports: [
    CommonModule
  ],
  exports:[displayDate]
})
export class SharedModule { }
