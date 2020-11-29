import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { take } from 'rxjs/operators';
import { ItemCarteService } from './item-carte.service';
import { ItemCategorieI } from '../interfaces/ItemCategorieI';
import { StockI } from '../interfaces/StockI';

@Injectable({
    providedIn: 'root'
  })

  export class ServeurService {
    private findCategoryUrl= environment.apiUrl + '/serveur/findCategory/';
    private findStockUrl= environment.apiUrl + '/serveur/findStocks/';

    getCategory():Observable<ItemCategorieI[]>{
        return this.http.get<ItemCategorieI[]>(this.findCategoryUrl)
    }

    getStock(category: ItemCategorieI):Observable<StockI[]>{
        return this.http.get<StockI[]>(this.findStockUrl+category.id);
    }

    constructor(private http: HttpClient) { }
  }