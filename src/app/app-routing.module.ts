import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './rootComponent/login/login.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [{ path: 'carte', loadChildren: () => import('./carte/carte.module').then(m => m.CarteModule) },
{ path: 'infos', loadChildren: () => import('./infos/infos.module').then(m => m.InfosModule) }, 
{ path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) }, 
{ path: 'medias', loadChildren: () => import('./medias/medias.module').then(m => m.MediasModule) }, 
{ path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule) },
{ path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
