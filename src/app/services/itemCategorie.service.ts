import { Injectable } from '@angular/core';
import { ItemCategorieI } from '../interfaces/ItemCategorieI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../environement/environement'
import { take } from 'rxjs/operators';
import { ItemCarteService } from './item-carte.service';


@Injectable({
  providedIn: 'root'
})

export class ItemCategorieService {
  private categoriesFindUrl = environment.apiUrl+'/categorie/find/';
  private categoriesUpdateUrl = environment.apiUrl+'/categorie/update/';
  private categorieDeleteUrl= environment.apiUrl+'/categorie/delete/';
  private categorieAddUrl=environment.apiUrl+'/categorie/insert/';

  private categories:Observable<ItemCategorieI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategories(): Observable<ItemCategorieI[]>{
    this.itemCarteService.resetList();
    if(!this.categories)
    {
      this.http.get<ItemCategorieI[]>(this.categoriesFindUrl).pipe(take(1)).subscribe(categories=>{
        this.categories=new Observable<ItemCategorieI[]>(observe=>{
          observe.next(categories);
          observe.complete;
        })
      })
        return this.http.get<ItemCategorieI[]>(this.categoriesFindUrl);
    }
    else
    {
      return this.categories;
    }
  }

  gets(): Observable<ItemCategorieI[]>{
      return this.http.get<ItemCategorieI[]>(this.categoriesFindUrl);
  }


  resetList(): void {
    this.categories=null;
  }  
  
  updateCategorie(categorie:ItemCategorieI): Observable<any> {
    this.itemCarteService.resetList();
   return this.http.put(this.categoriesUpdateUrl,categorie,this.httpOptionsUpdate);
  }

  deleteCategorie(categorie:ItemCategorieI): Observable<any> {
    var finalUrl=this.categorieDeleteUrl+categorie.id;
    return this.http.delete(finalUrl);
  }

  addCategorie(categorie:ItemCategorieI):Observable<ItemCategorieI> {
    return this.http.put<ItemCategorieI>(this.categorieAddUrl,categorie,this.httpOptionsUpdate);
  }

  constructor(private itemCarteService:ItemCarteService,private http: HttpClient) { }
}
