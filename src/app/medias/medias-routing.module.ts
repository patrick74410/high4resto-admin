import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';
import { ImageCategorieComponent } from './categorie/ImageCategorie.component';

import { ImageComponent  } from './image/image.component'

const routes: Routes = [
  { path: 'images', component: ImageComponent, canActivate:[AuthGuardService] },
  { path:'categories', component: ImageCategorieComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediasRoutingModule { }
