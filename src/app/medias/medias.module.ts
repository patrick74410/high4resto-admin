import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediasRoutingModule } from './medias-routing.module';
import { ImageComponent } from './image/image.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { ImageCategorieComponent } from './categorie/ImageCategorie.component';
import { SharedModule } from '../shared/shared.module';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [ImageComponent, ImageCategorieComponent],
  imports: [
    CommonModule,
    MediasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPicaModule,
    DragDropModule,
    SharedModule
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class MediasModule { }
