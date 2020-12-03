import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColdCookRoutingModule } from './cold-cook-routing.module';
import { InterfaceComponent } from './interface/interface.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [InterfaceComponent],
  imports: [
    CommonModule,
    ColdCookRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ColdCookModule { }
