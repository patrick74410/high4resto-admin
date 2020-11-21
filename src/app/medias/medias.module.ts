import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediasRoutingModule } from './medias-routing.module';
import {ImageComponent} from './image/image.component'
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';
import { ImageCategorieComponent } from './categorie/ImageCategorie.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [ImageComponent,ImageCategorieComponent],
  imports: [
    CommonModule,
    MediasRoutingModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPicaModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    SharedModule,
    MatButtonToggleModule
  ],
  providers: [ {provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class MediasModule { }
