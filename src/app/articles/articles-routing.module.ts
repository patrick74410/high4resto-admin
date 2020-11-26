import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/Auth/auth-guard.service';
import { ArticleComponent } from './articles/article.component';
import { CategorieComponent } from './categorie/categorie.component';


const routes: Routes = [
  { path: 'categories', component: CategorieComponent, canActivate: [AuthGuardService] },
  { path: 'edition', component: ArticleComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
