import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { itemMenuI } from '../interfaces/itemMenuI'
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

  getItemMenus(): Observable<itemMenuI[]>{
    return this.http.get<itemMenuI[]>(this.itemMenusFindUrl);
  }

  addItemMenu(itemMenu:itemMenuI):Observable<itemMenuI> {
    return this.http.put<itemMenuI>(this.itemMenuAddUrl,itemMenu,this.httpOptionsUpdate);
  }

  deleteItem(itemMenu:itemMenuI): Observable<any> {
    var finalUrl=this.itemMenuDeleteUrl+itemMenu.id;
    return this.http.delete(finalUrl);
  }

  constructor(private http: HttpClient) { }
}
