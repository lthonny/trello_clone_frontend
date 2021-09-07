import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [
    ErrorComponent
  ]
})
export class SharedModule { }
