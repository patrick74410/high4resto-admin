import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosRoutingModule } from './infos-routing.module';
import { HoraireService } from '../services/horaire.service';
import { HoraireComponent } from './horaire/horaire.component';
import { IdentiteService } from '../services/identite.service';
import { SharedModule } from '../shared/shared.module';
import { IdentiteComponent } from './identite/identite.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HoraireComponent, IdentiteComponent],
  imports: [
    CommonModule,
    InfosRoutingModule,
    SharedModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [],
  providers: [HoraireService, IdentiteService]
})
export class InfosModule { }