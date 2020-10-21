import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ItemMenuI } from '../interfaces/itemMenuI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemMenuService {
  private itemMenusFindUrl = 'http://localhost:8080/itemMenu/find/';
  private itemMenusUpdateUrl = 'http://localhost:8080/itemMenu/update/';
  private itemMenuDeleteUrl= 'http://localhost:8080/itemMenu/delete/';
  private itemMenuAddUrl='http://localhost:8080/itemMenu/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getItemMenus(): Observable<ItemMenuI[]>{
    return this.http.get<ItemMenuI[]>(this.itemMenusFindUrl);
  }

  addItemMenu(itemMenu:ItemMenuI):Observable<ItemMenuI> {
    return this.http.put<ItemMenuI>(this.itemMenuAddUrl,itemMenu,this.httpOptionsUpdate);
  }

  deleteItem(itemMenu:ItemMenuI): Observable<any> {
    var finalUrl=this.itemMenuDeleteUrl+itemMenu.id;
    return this.http.delete(finalUrl);
  }
 
  updateItem(itemMenu:ItemMenuI): Observable<any> {
    return this.http.put(this.itemMenusUpdateUrl,itemMenu,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
