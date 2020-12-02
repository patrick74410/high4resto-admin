import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { ItemCategorieI } from '../interfaces/ItemCategorieI';
import { StockI } from '../interfaces/StockI';
import { PreOrderI } from '../interfaces/tracability/PreOrder';
import { OrderI } from '../interfaces/tracability/Order';

@Injectable({
  providedIn: 'root'
})

export class ServeurService {
  private findCategoryUrl = environment.apiUrl + '/serveur/findCategory/';
  private findStockUrl = environment.apiUrl + '/serveur/findStocks/';
  private findPreOrderUrl = environment.apiUrl + '/serveur/findPreOrders/';
  private moveToPreOrderUrl = environment.apiUrl + '/serveur/moveToPreorder/';
  private moveToOrderUrl = environment.apiUrl + '/serveur/moveToOrder/';
  private moveBackToStockUrl = environment.apiUrl + '/serveur/moveBackToStock/';
  private findOrderUrl=environment.apiUrl + '/serveur/findOrder/';
  private moveToTakeUrl= environment.apiUrl + '/serveur/moveToTake/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategory(): Observable<ItemCategorieI[]> {
    return this.http.get<ItemCategorieI[]>(this.findCategoryUrl)
  }

  getStock(category: ItemCategorieI): Observable<StockI[]> {
    return this.http.get<StockI[]>(this.findStockUrl + category.id);
  }

  getPreOrder(table: string): Observable<PreOrderI[]> {
    return this.http.get<PreOrderI[]>(this.findPreOrderUrl + table);
  }

  getOrder(table: string):Observable<OrderI[]> {
    return this.http.get<OrderI[]>(this.findOrderUrl+table)
  }

  moveToPreOrder(preOrder: PreOrderI): Observable<PreOrderI> {
    return this.http.put<PreOrderI>(this.moveToPreOrderUrl, preOrder, this.httpOptionsUpdate);
  }

  moveToOrder(order: OrderI): Observable<OrderI> {
    return this.http.put<OrderI>(this.moveToOrderUrl, order, this.httpOptionsUpdate);
  }

  moveToTake(order: OrderI): Observable<OrderI> {
    return this.http.put<OrderI>(this.moveToTakeUrl, order, this.httpOptionsUpdate);
  }


  moveBackToStock(preOrder: PreOrderI): Observable<StockI> {
    return this.http.put<StockI>(this.moveBackToStockUrl, preOrder, this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}