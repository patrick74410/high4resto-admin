import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { TvaI } from '../interfaces/TvaI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class TvaService {
  private tvasFindUrl = environment.apiUrl+'/tva/find/';
  private tvasUpdateUrl = environment.apiUrl+'/tva/update/';
  private tvaDeleteUrl= environment.apiUrl+'/tva/delete/';
  private tvaAddUrl= environment.apiUrl+'/tva/insert/';
  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTvas(): Observable<TvaI[]>{
    return this.http.get<TvaI[]>(this.tvasFindUrl);
  }

  updateTva(tva:TvaI): Observable<any> {
   return this.http.put(this.tvasUpdateUrl,tva,this.httpOptionsUpdate);
  }

  deleteTva(tva:TvaI): Observable<any> {
    var finalUrl=this.tvaDeleteUrl+tva.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addTva(tva:TvaI):Observable<TvaI> {
    return this.http.put<TvaI>(this.tvaAddUrl,tva,this.httpOptionsUpdate);
  }

  constructor(private http:HttpClient) { }
}
