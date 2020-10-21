import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { AllergeneI } from '../interfaces/allergeneI'
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

  getAllergenes(): Observable<AllergeneI[]>{
    return this.http.get<AllergeneI[]>(this.allergenesFindUrl);
  }

  updateAllergene(allergene:AllergeneI): Observable<any> {
   return this.http.put(this.allergenesUpdateUrl,allergene,this.httpOptionsUpdate);
  }

  deleteAllergene(allergene:AllergeneI): Observable<any> {
    var finalUrl=this.allergeneDeleteUrl+allergene.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addAllergene(allergene:AllergeneI):Observable<AllergeneI> {
    return this.http.put<AllergeneI>(this.allergeneAddUrl,allergene,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
