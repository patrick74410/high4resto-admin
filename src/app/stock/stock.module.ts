import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock/stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '../shared/shared.module';
import { ItemToPreparationComponent } from './item-to-preparation/item-to-preparation.component';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [StockComponent, ItemToPreparationComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    SharedModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
    SharedModule
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class StockModule { }
