import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './articles/article.component'
import { AuthGuardService } from '../services/Auth/auth-guard.service';

const routes: Routes = [
  { path: 'categories', component: CategorieComponent,canActivate:[AuthGuardService] },
  { path: 'edition', component:ArticleComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
