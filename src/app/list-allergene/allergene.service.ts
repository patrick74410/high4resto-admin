import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { allergeneI } from '../interfaces/allergeneI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AllergeneService {
  private allergenesFindUrl = 'http://localhost:8080/allergene/find/';
  private allergenesUpdateUrl = 'http://localhost:8080/allergene/update/';
  private allergeneDeleteUrl= 'http://localhost:8080/allergene/delete/';
  private allergeneAddUrl='http://localhost:8080/allergene/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllergenes(): Observable<allergeneI[]>{
    return this.http.get<allergeneI[]>(this.allergenesFindUrl);
  }

  updateAllergene(allergene:allergeneI): Observable<any> {
   return this.http.put(this.allergenesUpdateUrl,allergene,this.httpOptionsUpdate);
  }

  deleteAllergene(allergene:allergeneI): Observable<any> {
    var finalUrl=this.allergeneDeleteUrl+allergene.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addAllergene(allergene:allergeneI):Observable<allergeneI> {
    return this.http.put<allergeneI>(this.allergeneAddUrl,allergene,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
