import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';
import { AlbumComponent } from './album/album.component';

import { ImageComponent  } from './image/image.component'

const routes: Routes = [
  { path: 'images', component: ImageComponent, canActivate:[AuthGuardService] },
  { path:'albums', component: AlbumComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediasRoutingModule { }
