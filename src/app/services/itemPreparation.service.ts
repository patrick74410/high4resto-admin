import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { ItemPreparationI } from '../interfaces/ItemPreparation';

@Injectable({
    providedIn: 'root'
  })

export class ItemPreparationService {
    private itemPreparationsFindUrl = environment.apiUrl + '/itemPreparation/find/';
    private itemPreparationsUpdateUrl = environment.apiUrl + '/itemPreparation/update/';
    private itemPreparationDeleteUrl = environment.apiUrl + '/itemPreparation/delete/';
    private itemPreparationAddUrl = environment.apiUrl + '/itemPreparation/insert/';

    private httpOptionsUpdate = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getItemRoles(): Observable<ItemPreparationI[]> {
        return this.http.get<ItemPreparationI[]>(this.itemPreparationsFindUrl);
    }

    getItemRolesWithId(id:string): Observable<ItemPreparationI> {
      return this.http.get<ItemPreparationI>(this.itemPreparationsFindUrl+id);
  }

    resetList(): void {
    }

    updateItemRole(itemPreparation: ItemPreparationI): Observable<any> {
      return this.http.put(this.itemPreparationsUpdateUrl, itemPreparation, this.httpOptionsUpdate);
    }

    deleteItemRole(itemPreparation: ItemPreparationI): Observable<any> {
      var finalUrl = this.itemPreparationDeleteUrl + itemPreparation.id;
      return this.http.delete(finalUrl);
    }

    addItemRole(itemPreparation: ItemPreparationI): Observable<ItemPreparationI> {
      return this.http.put<ItemPreparationI>(this.itemPreparationAddUrl, itemPreparation, this.httpOptionsUpdate);
    }


    ngOnInit(): void
    {

    }
    constructor( private http: HttpClient) { }

}