import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';
import { MetaTagComponent } from './meta-tag/meta-tag.component';

import { TvaComponent } from './tva/tva.component';
import { WebConfigComponent } from './web-config/web-config.component';

const routes: Routes = [
  { path: 'tva', component: TvaComponent,canActivate:[AuthGuardService] },
  { path: 'meta-tag', component: MetaTagComponent,canActivate:[AuthGuardService] },
  { path: 'web-config',component: WebConfigComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
