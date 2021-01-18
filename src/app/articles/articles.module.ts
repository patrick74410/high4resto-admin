import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { CategorieComponent } from './categorie/categorie.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { ArticleComponent } from './articles/article.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [CategorieComponent, ArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    AngularEditorModule
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})

export class ArticlesModule { }
