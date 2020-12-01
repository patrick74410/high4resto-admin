import { Injectable } from '@angular/core';
import { TvaI } from '../interfaces/TvaI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { take } from 'rxjs/operators';
import { ItemCarteService } from './item-carte.service';

@Injectable({
  providedIn: 'root'
})

export class TvaService {
  private tvasFindUrl = environment.apiUrl + '/tva/find/';
  private tvasUpdateUrl = environment.apiUrl + '/tva/update/';
  private tvaDeleteUrl = environment.apiUrl + '/tva/delete/';
  private tvaAddUrl = environment.apiUrl + '/tva/insert/';

  private tva: Observable<TvaI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTvas(): Observable<TvaI[]> {
    if (!this.tva) {
      this.http.get<TvaI[]>(this.tvasFindUrl).pipe(take(1)).subscribe(tva => {
        this.tva = new Observable<TvaI[]>(observe => {
          observe.next(tva);
          observe.complete
        })
      })
      return this.http.get<TvaI[]>(this.tvasFindUrl);
    }
    else {
      return this.tva;
    }
  }

  resetList(): void {
    this.tva = null;
  }

  updateTva(tva: TvaI): Observable<any> {
    this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items => {
      for (let itemCarte of items) {
        if (itemCarte.tva.id == tva.id) {
          itemCarte.tva = tva;
          this.itemCarteService.updateItem(itemCarte).pipe(take(1)).subscribe();
        }
      }
    })
    return this.http.put(this.tvasUpdateUrl, tva, this.httpOptionsUpdate);
  }

  deleteTva(tva: TvaI): Observable<any> {
    var finalUrl = this.tvaDeleteUrl + tva.id;
    return this.http.delete(finalUrl);
  }

  addTva(tva: TvaI): Observable<TvaI> {
    return this.http.put<TvaI>(this.tvaAddUrl, tva, this.httpOptionsUpdate);
  }

  constructor(private itemCarteService: ItemCarteService, private http: HttpClient) { }
}
