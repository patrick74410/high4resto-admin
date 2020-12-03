import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { OrderI } from '../interfaces/tracability/Order';
import { ToPrepareI } from '../interfaces/tracability/ToPrepare';

@Injectable({
  providedIn: 'root'
})

export class PreparateurService {
    private findSignalOrderUrl = environment.apiUrl + '/preparateur/findSignalOrder/';
    private findToTakeOrderURL = environment.apiUrl + '/preparateur/findToTakeOrder/';
    private moveToPrepareUrl = environment.apiUrl + '/preparateur/moveToPrepare/';
    private findToPrepareUrl = environment.apiUrl + '/preparateur/findToPrepare/';

    private httpOptionsUpdate = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    moveToPrepare(toPrepare:ToPrepareI): Observable<ToPrepareI>
    {
      return this.http.put<ToPrepareI>(this.moveToPrepareUrl,toPrepare, this.httpOptionsUpdate);
    }

    getToPrepare(role: string):Observable<ToPrepareI[]>
    {
      return this.http.get<ToPrepareI[]>(this.findToPrepareUrl+role);
    }

    getSignalOrder(role: string): Observable<OrderI[]>
    {
        return this.http.get<OrderI[]>(this.findSignalOrderUrl+role);
    }

    getToTakeOrder(role: string): Observable<OrderI[]>
    {
        return this.http.get<OrderI[]>(this.findToTakeOrderURL+role);
    }


  constructor(private http: HttpClient) { }
}