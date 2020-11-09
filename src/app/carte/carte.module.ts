import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteRoutingModule } from './carte-routing.module';
import {AllergeneComponent} from './allergene/allergene.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllergeneService } from '../services/allergene.service';
import { HttpClientModule} from '@angular/common/http';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';
import { OptionsItemComponent } from './options/options.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PromotionsComponent } from './promotions/promotions.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CategorieComponent } from './categorie/categorie.component';
import { SharedModule } from '../shared/shared.module';
import { ListItemCarteComponent } from './list-item-carte/list-item-carte.component';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [AllergeneComponent,OptionsItemComponent,PromotionsComponent,CategorieComponent,ListItemCarteComponent],
  imports: [
    CommonModule,
    CarteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    EditorModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
    SharedModule
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class CarteModule { }
