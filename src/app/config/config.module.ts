import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { TvaComponent } from './tva/tva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MetaTagComponent } from './meta-tag/meta-tag.component';
import { WebConfigComponent } from './web-config/web-config.component';
import { UserComponent } from './user/user.component';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [TvaComponent, MetaTagComponent, WebConfigComponent, UserComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DragDropModule,
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class ConfigModule { }
