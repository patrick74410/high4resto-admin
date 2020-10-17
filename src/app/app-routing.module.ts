import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAllergeneComponent } from './list-allergene/list-allergene.component';
import {ListCategorieComponent } from './list-categorie/list-categorie.component'
import {ListImageComponent} from './list-image/list-image.component'
import {ListItemMenuComponent} from './list-item-menu/list-item-menu.component'

const routes: Routes = [ {path: 'allergene',component: ListAllergeneComponent},
{path: 'categorie',component: ListCategorieComponent},
{path: 'image',component:ListImageComponent},
{path:'itemMenu',component:ListItemMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
