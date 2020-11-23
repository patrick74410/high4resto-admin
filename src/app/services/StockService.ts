import { Injectable } from '@angular/core';
import { StockI } from '../interfaces/StockI'
import { Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement';
import { ItemCarteService } from './item-carte.service';

@Injectable({
    providedIn: 'root'
  })
  export class StockService {
    private stockFindUrl = environment.apiUrl+'/stock/find/';
    private stockMoveUrl= environment.apiUrl+'/stock/move_to_next/';
    private stockAddUrl=environment.apiUrl+'/stock/insert/';

    private httpOptionsUpdate = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      getStock(): Observable<StockI[]>{
        return this.http.get<StockI[]>(this.stockFindUrl);         
      }

      addStock(stock:StockI):Observable<StockI> {
        return this.http.put<StockI>(this.stockAddUrl,stock,this.httpOptionsUpdate);
      }     

      addManyStock(stock:StockI,qty:number):Observable<StockI> {
        return this.http.put<StockI>(this.stockAddUrl+qty,stock,this.httpOptionsUpdate);
      }

      moveStock(stock:StockI): Observable<any> {
        var finalUrl=this.stockMoveUrl+stock.id+"/";
        return this.http.delete(finalUrl);
      }

      constructor(private itemCarteService:ItemCarteService,private http:HttpClient) { }

  }