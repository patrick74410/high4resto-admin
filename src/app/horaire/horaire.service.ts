import { Injectable } from '@angular/core';
import { HoraireI } from '../interfaces/HoraireI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  private horairesFindUrl = environment.apiUrl+'/horaire/find/';
  private horairesUpdateUrl = environment.apiUrl+'/horaire/update/';
  private horaireDeleteUrl= environment.apiUrl+'/horaire/delete/';
  private horaireAddUrl= environment.apiUrl+'/horaire/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHoraires(): Observable<HoraireI[]>{
    return this.http.get<HoraireI[]>(this.horairesFindUrl);
  }

  updateHoraire(horaire:HoraireI): Observable<any> {
   return this.http.put(this.horairesUpdateUrl,horaire,this.httpOptionsUpdate);
  }

  deleteHoraire(horaire:HoraireI): Observable<any> {
    var finalUrl=this.horaireDeleteUrl+horaire.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  constructor(private http: HttpClient) { } 
}
