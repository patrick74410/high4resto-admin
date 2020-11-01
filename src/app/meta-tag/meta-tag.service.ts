import { Injectable } from '@angular/core';
import { MetaTagI } from '../interfaces/MetaTagI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
  private metaTagsFindUrl = environment.apiUrl+'/metaTag/find/';
  private metaTagsUpdateUrl = environment.apiUrl+'/metaTag/update/';
  private metaTagAddUrl= environment.apiUrl+'/metaTag/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMetaTags(): Observable<MetaTagI[]>{
    return this.http.get<MetaTagI[]>(this.metaTagsFindUrl);
  }

  updateMetaTag(metaTag:MetaTagI): Observable<any> {
   return this.http.put(this.metaTagsUpdateUrl,metaTag,this.httpOptionsUpdate);
  }


  addMetaTag(metaTag:MetaTagI):Observable<MetaTagI> {
    return this.http.put<MetaTagI>(this.metaTagAddUrl,metaTag,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { } 

}
