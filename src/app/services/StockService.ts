import { Injectable } from '@angular/core';
import { StockI } from '../interfaces/StockI'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement';
import { ItemCarteService } from './item-carte.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockFindUrl = environment.apiUrl + '/stock/find/';
  private stockMoveUrl = environment.apiUrl + '/stock/delete/';
  private stockAddUrl = environment.apiUrl + '/stock/insert/';
  private stockGrouppedUrl = environment.apiUrl + '/stock/grouped/find/';
  private updateQtyUrl = environment.apiUrl + '/stock/updateQty/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getStock(): Observable<StockI[]> {
    return this.http.get<StockI[]>(this.stockFindUrl);
  }

  getGrouppedStock(): Observable<StockI[]> {
    return this.http.get<StockI[]>(this.stockGrouppedUrl);
  }

  addStock(stock: StockI, username: string): Observable<StockI> {
    return this.http.put<StockI>(this.stockAddUrl + '/' + username, stock, this.httpOptionsUpdate);
  }

  addManyStock(stock: StockI, qty: number, username): Observable<StockI> {
    return this.http.put<StockI>(this.stockAddUrl + qty + '/' + username, stock, this.httpOptionsUpdate);
  }

  deleteStock(stock: StockI): Observable<any> {
    var finalUrl = this.stockMoveUrl + stock.id + "/";
    return this.http.delete(finalUrl);
  }
  updateQty(username: string, itemId: string, qty: number): Observable<any> {
    var finalUrl = this.updateQtyUrl + username + "/" + itemId + "/" + qty + "/";
    return this.http.get(finalUrl);
  }

  constructor(private itemCarteService: ItemCarteService, private http: HttpClient) { }

}