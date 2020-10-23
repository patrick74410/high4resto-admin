import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { CategorieI } from '../interfaces/categorieI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categoriesFindUrl = environment.apiUrl+'/categorie/find/';
  private categoriesUpdateUrl = environment.apiUrl+'/categorie/update/';
  private categorieDeleteUrl= environment.apiUrl+'/categorie/delete/';
  private categorieAddUrl=environment.apiUrl+'/categorie/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategories(): Observable<CategorieI[]>{
    return this.http.get<CategorieI[]>(this.categoriesFindUrl);
  }

  updateCategorie(categorie:CategorieI): Observable<any> {
   return this.http.put(this.categoriesUpdateUrl,categorie,this.httpOptionsUpdate);
  }

  deleteCategorie(categorie:CategorieI): Observable<any> {
    var finalUrl=this.categorieDeleteUrl+categorie.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addCategorie(categorie:CategorieI):Observable<CategorieI> {
    return this.http.put<CategorieI>(this.categorieAddUrl,categorie,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
