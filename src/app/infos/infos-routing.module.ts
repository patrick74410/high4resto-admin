import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';

import { HoraireComponent } from './horaire/horaire.component'
import { IdentiteComponent } from './identite/identite.component';

const routes: Routes = [
  { path: 'horaire', component: HoraireComponent, canActivate: [AuthGuardService] },
  { path: 'mon-entreprise', component: IdentiteComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosRoutingModule { }
