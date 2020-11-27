import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { ItemRoleLinkI } from '../interfaces/ItemRoleLinkI';

@Injectable({
    providedIn: 'root'
  })

export class ItemRoleLinkService {
    private itemRoleLinksFindUrl = environment.apiUrl + '/itemRoleLink/find/';
    private itemRoleLinksUpdateUrl = environment.apiUrl + '/itemRoleLink/update/';
    private itemRoleLinkDeleteUrl = environment.apiUrl + '/itemRoleLink/delete/';
    private itemRoleLinkAddUrl = environment.apiUrl + '/itemRoleLink/insert/';

    private httpOptionsUpdate = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getTvas(): Observable<ItemRoleLinkI[]> {
        return this.http.get<ItemRoleLinkI[]>(this.itemRoleLinksFindUrl);
    }

    resetList(): void {
    }

    updateTva(itemRoleLink: ItemRoleLinkI): Observable<any> {
      return this.http.put(this.itemRoleLinksUpdateUrl, itemRoleLink, this.httpOptionsUpdate);
    }

    deleteTva(itemRoleLink: ItemRoleLinkI): Observable<any> {
      var finalUrl = this.itemRoleLinkDeleteUrl + itemRoleLink.id;
      return this.http.delete(finalUrl);
    }

    addTva(itemRoleLink: ItemRoleLinkI): Observable<ItemRoleLinkI> {
      return this.http.put<ItemRoleLinkI>(this.itemRoleLinkAddUrl, itemRoleLink, this.httpOptionsUpdate);
    }
    constructor( private http: HttpClient) { }
}