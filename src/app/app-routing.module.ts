import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAllergeneComponent } from './list-allergene/list-allergene.component';
import {ListCategorieComponent } from './list-categorie/list-categorie.component'
import {ListImageComponent} from './list-image/list-image.component'
import {ListItemCarteComponent} from './list-item-carte/list-item-carte.component'
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Auth/auth-guard.service'
import { ListTvaComponent } from './list-tva/list-tva.component';

const routes: Routes = [ {path: 'allergene',component: ListAllergeneComponent,canActivate:[AuthGuardService]},
{path: 'categorie',component: ListCategorieComponent,canActivate:[AuthGuardService]},
{path: 'image',component:ListImageComponent,canActivate:[AuthGuardService]},
{path:'itemCarte',component:ListItemCarteComponent,canActivate:[AuthGuardService]},
{path:'tva',component:ListTvaComponent,canActivate:[AuthGuardService]},
{path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
