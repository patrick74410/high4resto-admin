import { Injectable } from '@angular/core';
import { ArticleCategorieI } from '../interfaces/ArticleCategorieI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../environement/environement'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleCategorieService {
  private articleCategoriesFindUrl = environment.apiUrl+'/articleCategorie/find/';
  private articleCategoriesUpdateUrl = environment.apiUrl+'/articleCategorie/update/';
  private articleCategorieDeleteUrl= environment.apiUrl+'/articleCategorie/delete/';
  private articleCategorieAddUrl=environment.apiUrl+'/articleCategorie/insert/';

  private articleCategories:Observable<ArticleCategorieI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getArticleCategories(): Observable<ArticleCategorieI[]>{
    if(!this.articleCategories)
    {
      this.http.get<ArticleCategorieI[]>(this.articleCategoriesFindUrl).pipe(take(1)).subscribe(articleCategorie=>{
        this.articleCategories=new Observable<ArticleCategorieI[]>(observe=>{
          observe.next(articleCategorie);
          observe.complete;
        })
      })
      return this.http.get<ArticleCategorieI[]>(this.articleCategoriesFindUrl);
    }
    else
    {
      return this.articleCategories;
    }
  }

  updateArticleCategorie(articleCategorie:ArticleCategorieI): Observable<any> {
   return this.http.put(this.articleCategoriesUpdateUrl,articleCategorie,this.httpOptionsUpdate);
  }

  deleteArticleCategorie(articleCategorie:ArticleCategorieI): Observable<any> {
    var finalUrl=this.articleCategorieDeleteUrl+articleCategorie.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addArticleCategorie(articleCategorie:ArticleCategorieI):Observable<ArticleCategorieI> {
    return this.http.put<ArticleCategorieI>(this.articleCategorieAddUrl,articleCategorie,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
