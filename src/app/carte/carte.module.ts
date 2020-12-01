import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteRoutingModule } from './carte-routing.module';
import { AllergeneComponent } from './allergene/allergene.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { OptionsItemComponent } from './options/options.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PromotionsComponent } from './promotions/promotions.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CategorieComponent } from './categorie/categorie.component';
import { SharedModule } from '../shared/shared.module';
import { ListItemCarteComponent } from './list-item-carte/list-item-carte.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [AllergeneComponent, OptionsItemComponent, PromotionsComponent, CategorieComponent, ListItemCarteComponent],
  imports: [
    CommonModule,
    CarteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    EditorModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class CarteModule { }
