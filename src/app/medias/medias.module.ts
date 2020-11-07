import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediasRoutingModule } from './medias-routing.module';
import {ImageComponent} from './image/image.component'
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import { AlbumComponent } from './album/album.component';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [ImageComponent,AlbumComponent],
  imports: [
    CommonModule,
    MediasRoutingModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPicaModule,
    DragDropModule
  ],
  providers: [ {provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class MediasModule { }
