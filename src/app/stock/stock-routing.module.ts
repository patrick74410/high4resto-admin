import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';
import { ItemDisponibilityComponent } from './item-disponibility/item-disponibility.component';
import { ItemToPreparationComponent } from './item-to-preparation/item-to-preparation.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: 'stock', component: StockComponent, canActivate: [AuthGuardService] },
  { path: 'itemDisponibility', component: ItemDisponibilityComponent, canActivate: [AuthGuardService] },
  { path: 'itemToPreparation', component: ItemToPreparationComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
