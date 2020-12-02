import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColdCookRoutingModule } from './cold-cook-routing.module';
import { InterfaceComponent } from './interface/interface.component';


@NgModule({
  declarations: [InterfaceComponent],
  imports: [
    CommonModule,
    ColdCookRoutingModule
  ]
})
export class ColdCookModule { }
