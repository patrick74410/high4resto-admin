import { Injectable } from '@angular/core';
import { PromotionI } from '../interfaces/promotionI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private promotionFindUrl = environment.apiUrl+'/promotions/find/';
  private promotionUpdateUrl = environment.apiUrl+'/promotions/update/';
  private promotionDeleteUrl= environment.apiUrl+'/promotions/delete/';
  private promotionAddUrl=environment.apiUrl+'/promotions/insert/';

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPromotions(): Observable<PromotionI[]>{
    return this.http.get<PromotionI[]>(this.promotionFindUrl);
  }

  addPromotion(promotion:PromotionI):Observable<PromotionI> {
    return this.http.put<PromotionI>(this.promotionAddUrl,promotion,this.httpOptionsUpdate);
  }

  deletePromotion(promotion:PromotionI): Observable<any> {
    var finalUrl=this.promotionDeleteUrl+promotion.id;
    return this.http.delete(finalUrl);
  }
 
  updatePromotion(promotion:PromotionI): Observable<any> {
    return this.http.put(this.promotionUpdateUrl,promotion,this.httpOptionsUpdate);
  }

  constructor(private http:HttpClient) { }
}
