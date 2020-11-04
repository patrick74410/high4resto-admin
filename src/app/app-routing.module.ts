import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAllergeneComponent } from './list-allergene/list-allergene.component';
import {ListCategorieComponent } from './list-categorie/list-categorie.component'
import {ListImageComponent} from './list-image/list-image.component'
import {ListItemCarteComponent} from './list-item-carte/list-item-carte.component'
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Auth/auth-guard.service'
import { ListTvaComponent } from './list-tva/list-tva.component';
import { ListOptionsItemComponent } from './list-options-item/list-options-item.component';
import { ListPromotionsComponent } from './list-promotions/list-promotions.component';
import { HoraireComponent } from './horaire/horaire.component';
import { IdentiteComponent } from './identite/identite.component';
import { AlbumComponent } from './album/album.component';
import { MetaTagComponent } from './meta-tag/meta-tag.component';
import { ListArticleCategorieComponent } from './list-article-categorie/list-article-categorie.component';
import { ListArticleComponent } from './list-article/list-article.component';

const routes: Routes = [ {path: 'allergene',component: ListAllergeneComponent,canActivate:[AuthGuardService]},
{path: 'categorie',component: ListCategorieComponent,canActivate:[AuthGuardService]},
{path: 'image',component:ListImageComponent,canActivate:[AuthGuardService]},
{path:'itemCarte',component:ListItemCarteComponent,canActivate:[AuthGuardService]},
{path:'tva',component:ListTvaComponent,canActivate:[AuthGuardService]},
{path:'option-carte',component:ListOptionsItemComponent,canActivate:[AuthGuardService]},
{path: 'promotions',component:ListPromotionsComponent,canActivate:[AuthGuardService]},
{path: 'horaire',component:HoraireComponent,canActivate:[AuthGuardService]},
{path: 'identite',component:IdentiteComponent,canActivate:[AuthGuardService]},
{path:'album',component:AlbumComponent,canActivate:[AuthGuardService]},
{path: 'metaTag',component:MetaTagComponent,canActivate:[AuthGuardService]},
{path: 'articleCategorie',component:ListArticleCategorieComponent,canActivate:[AuthGuardService]},
{path:'article',component:ListArticleComponent,canActivate:[AuthGuardService]},
{path: 'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
