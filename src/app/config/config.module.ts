import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { TvaComponent } from './tva/tva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MetaTagComponent } from './meta-tag/meta-tag.component';


@NgModule({
  declarations: [TvaComponent,MetaTagComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ConfigModule { }
