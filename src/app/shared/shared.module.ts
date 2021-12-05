import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./modules/material/material.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDividerModule} from "@angular/material/divider";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ClipboardModule} from "@angular/cdk/clipboard";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NgbModule,
    MatDividerModule,
    DragDropModule,
    ClipboardModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NgbModule,
    MatDividerModule,
    DragDropModule,
    ClipboardModule,
  ],
  declarations: [
    ErrorComponent
  ]
})
export class SharedModule { }
