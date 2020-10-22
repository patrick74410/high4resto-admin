import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ItemCarteI } from '../interfaces/itemCarteI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemCarteService {
  private itemCarteFindUrl = 'http://localhost:8080/itemCarte/find/';
  private itemCarteUpdateUrl = 'http://localhost:8080/itemCarte/update/';
  private itemCarteDeleteUrl= 'http://localhost:8080/itemCarte/delete/';
  private itemCarteAddUrl='http://localhost:8080/itemCarte/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getItemCartes(): Observable<ItemCarteI[]>{
    return this.http.get<ItemCarteI[]>(this.itemCarteFindUrl);
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
