import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';
import {OptionsItemComponent} from './options/options.component'

import { AllergeneComponent } from './allergene/allergene.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ListItemCarteComponent } from './list-item-carte/list-item-carte.component';
import { ItemDisponibilityComponent } from './item-disponibility/item-disponibility.component';

const routes: Routes = [
  { path: 'allergene', component: AllergeneComponent,canActivate:[AuthGuardService]},
  { path: 'options', component: OptionsItemComponent,canActivate:[AuthGuardService]},
  { path: 'promotions', component: PromotionsComponent,canActivate:[AuthGuardService]},  
  { path: 'categories', component: CategorieComponent,canActivate:[AuthGuardService]},  
  { path: 'items', component: ListItemCarteComponent,canActivate:[AuthGuardService]},  
  { path: 'itemDisponibility', component: ItemDisponibilityComponent,canActivate:[AuthGuardService]},  
  { path:'login'}
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule],
})
export class CarteRoutingModule { }
