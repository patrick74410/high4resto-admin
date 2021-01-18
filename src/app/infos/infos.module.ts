import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosRoutingModule } from './infos-routing.module';
import { HoraireService } from '../services/horaire.service';
import { HoraireComponent } from './horaire/horaire.component';
import { IdentiteService } from '../services/identite.service';
import { SharedModule } from '../shared/shared.module';
import { IdentiteComponent } from './identite/identite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [HoraireComponent, IdentiteComponent],
  imports: [
    CommonModule,
    InfosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
    AngularEditorModule,
  ],
  exports: [],
  providers: [HoraireService, IdentiteService]
})
export class InfosModule { }