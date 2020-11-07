import { Injectable } from '@angular/core';
import { IdentiteI } from '../interfaces/IdentiteI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class IdentiteService {
  private identitesFindUrl = environment.apiUrl+'/identite/find/';
  private identitesUpdateUrl = environment.apiUrl+'/identite/update/';
  private identiteAddUrl= environment.apiUrl+'/identite/insert/';

  private identite:Observable<IdentiteI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getIdentites(): Observable<IdentiteI[]>{
    if(!this.identite)
    {
      this.http.get<IdentiteI[]>(this.identitesFindUrl).pipe(take(1)).subscribe(identite=>{
        this.identite=new Observable <IdentiteI[]>(observe=>{
          observe.next(identite);
          observe.complete;
        })
      })
      return this.http.get<IdentiteI[]>(this.identitesFindUrl);
    }
    else
    {
      return this.identite;
    }
  }

  updateIdentite(identite:IdentiteI): Observable<any> {
   return this.http.put(this.identitesUpdateUrl,identite,this.httpOptionsUpdate);
  }


  addIdentite(identite:IdentiteI):Observable<IdentiteI> {
    return this.http.put<IdentiteI>(this.identiteAddUrl,identite,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { } 
}
