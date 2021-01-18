import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectItemComponent } from './select-item/select-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableFilterModule } from 'mat-table-filter';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableFilterModule,
    MatTabsModule,
    MatIconModule,

  ],
  declarations: [ImageModalComponent, SelectItemComponent],
  exports: [ImageModalComponent,
    SelectItemComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableFilterModule,
    MatTabsModule,
    MatIconModule]
})
export class SharedModule { }
