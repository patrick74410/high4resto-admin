import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAllergeneComponent } from './list-allergene/list-allergene.component';
import {ListCategorieComponent } from './list-categorie/list-categorie.component'
import {ListImageComponent} from './list-image/list-image.component'
import {ListItemMenuComponent} from './list-item-menu/list-item-menu.component'
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Auth/auth-guard.service'

const routes: Routes = [ {path: 'allergene',component: ListAllergeneComponent,canActivate:[AuthGuardService]},
{path: 'categorie',component: ListCategorieComponent,canActivate:[AuthGuardService]},
{path: 'image',component:ListImageComponent,canActivate:[AuthGuardService]},
{path:'itemMenu',component:ListItemMenuComponent,canActivate:[AuthGuardService]},
{path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
