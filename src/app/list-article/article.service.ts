import { Injectable } from '@angular/core';
import { ArticleI } from '../interfaces/ArticleI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../environement/environement'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesFindUrl = environment.apiUrl+'/article/find/';
  private articlesUpdateUrl = environment.apiUrl+'/article/update/';
  private articleDeleteUrl= environment.apiUrl+'/article/delete/';
  private articleAddUrl=environment.apiUrl+'/article/insert/';

  private articles:Observable<ArticleI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getArticles(): Observable<ArticleI[]>{
    if(!this.articles)
    {
      this.http.get<ArticleI[]>(this.articlesFindUrl).pipe(take(1)).subscribe(articles=>{
        this.articles=new Observable<ArticleI[]>(observe=>{
          observe.next(articles);
          observe.complete;
        })
      })
      return this.http.get<ArticleI[]>(this.articlesFindUrl);
    }
    else
    {
      return this.articles;
    }
  }

  updateArticle(article:ArticleI): Observable<any> {
   return this.http.put(this.articlesUpdateUrl,article,this.httpOptionsUpdate);
  }

  deleteArticle(article:ArticleI): Observable<any> {
    var finalUrl=this.articleDeleteUrl+article.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addArticle(article:ArticleI):Observable<ArticleI> {
    return this.http.put<ArticleI>(this.articleAddUrl,article,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
