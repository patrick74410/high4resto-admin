import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { categorieI } from '../interfaces/categorieI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categoriesFindUrl = 'http://localhost:8080/categorie/find/';
  private categoriesUpdateUrl = 'http://localhost:8080/categorie/update/';
  private categorieDeleteUrl= 'http://localhost:8080/categorie/delete/';
  private categorieAddUrl='http://localhost:8080/categorie/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getCategories(): Observable<categorieI[]>{
    return this.http.get<categorieI[]>(this.categoriesFindUrl);
  }

  updateCategorie(categorie:categorieI): Observable<any> {
   return this.http.put(this.categoriesUpdateUrl,categorie,this.httpOptionsUpdate);
  }

  deleteCategorie(categorie:categorieI): Observable<any> {
    var finalUrl=this.categorieDeleteUrl+categorie.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addCategorie(categorie:categorieI):Observable<categorieI> {
    return this.http.put<categorieI>(this.categorieAddUrl,categorie,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
