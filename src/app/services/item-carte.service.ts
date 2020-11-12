import { Injectable } from '@angular/core';
import { ItemCarteI } from '../interfaces/itemCarteI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemCarteService {
  private itemCarteFindUrl = environment.apiUrl+'/itemCarte/find/';
  private itemCarteUpdateUrl = environment.apiUrl+'/itemCarte/update/';
  private itemCarteDeleteUrl= environment.apiUrl+'/itemCarte/delete/';
  private itemCarteAddUrl=environment.apiUrl+'/itemCarte/insert/';

  private items:Observable<ItemCarteI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getItemCartes(): Observable<ItemCarteI[]>{
    if(!this.items)
    {
      this.http.get<ItemCarteI[]>(this.itemCarteFindUrl).pipe(take(1)).subscribe(items=>{
        this.items=new Observable<ItemCarteI[]>(observe=>{
          observe.next(items);
          observe.complete
        })
      })    
         return this.http.get<ItemCarteI[]>(this.itemCarteFindUrl);
    }
    else {
      return this.items;
    }
  }

  resetList(): void {
    this.items=null;
  }

  addItemCarte(itemCarte:ItemCarteI):Observable<ItemCarteI> {
    return this.http.put<ItemCarteI>(this.itemCarteAddUrl,itemCarte,this.httpOptionsUpdate);
  }

  deleteItem(itemCarte:ItemCarteI): Observable<any> {
    var finalUrl=this.itemCarteDeleteUrl+itemCarte.id;
    return this.http.delete(finalUrl);
  }
 
  updateItem(itemCarte:ItemCarteI): Observable<any> {
    return this.http.put(this.itemCarteUpdateUrl,itemCarte,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
