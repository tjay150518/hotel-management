import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
// import { MatTooltipModule } from '@angular/material/tooltip';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,


    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    AgGridAngular,
    QRCodeModule,
    NgxMaterialTimepickerModule,
    MatTabsModule,
    MatSlideToggleModule


  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    AgGridAngular,
    QRCodeModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    MatSlideToggleModule

  ],
  providers: [DatePipe]
})
export class SharedModule { }
