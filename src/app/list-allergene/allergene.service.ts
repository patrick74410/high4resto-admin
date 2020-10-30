import { Injectable } from '@angular/core';
import { AllergeneI } from '../interfaces/allergeneI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class AllergeneService {
  private allergenesFindUrl = environment.apiUrl+'/allergene/find/';
  private allergenesUpdateUrl = environment.apiUrl+'/allergene/update/';
  private allergeneDeleteUrl= environment.apiUrl+'/allergene/delete/';
  private allergeneAddUrl= environment.apiUrl+'/allergene/insert/';

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
