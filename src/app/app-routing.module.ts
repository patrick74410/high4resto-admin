import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './rootComponent/login/login.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [{ path: 'carte', loadChildren: () => import('./carte/carte.module').then(m => m.CarteModule) },
{ path: 'infos', loadChildren: () => import('./infos/infos.module').then(m => m.InfosModule) },
{ path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) },
{ path: 'medias', loadChildren: () => import('./medias/medias.module').then(m => m.MediasModule) },
{ path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule) },
{ path: 'login', component: LoginComponent },
{ path: 'gestion', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) },
{ path: 'home', component: HomeComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
