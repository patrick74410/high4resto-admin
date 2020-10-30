import { Injectable } from '@angular/core';
import { IdentiteI } from '../interfaces/IdentiteI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'
@Injectable({
  providedIn: 'root'
})
export class IdentiteService {
  private identitesFindUrl = environment.apiUrl+'/identite/find/';
  private identitesUpdateUrl = environment.apiUrl+'/identite/update/';
  private identiteAddUrl= environment.apiUrl+'/identite/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getIdentites(): Observable<IdentiteI[]>{
    return this.http.get<IdentiteI[]>(this.identitesFindUrl);
  }

  updateIdentite(identite:IdentiteI): Observable<any> {
   return this.http.put(this.identitesUpdateUrl,identite,this.httpOptionsUpdate);
  }


  addIdentite(identite:IdentiteI):Observable<IdentiteI> {
    return this.http.put<IdentiteI>(this.identiteAddUrl,identite,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { } 
}
