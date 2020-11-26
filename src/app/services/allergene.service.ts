import { Injectable } from '@angular/core';
import { AllergeneI } from '../interfaces/AllergeneI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { take } from 'rxjs/operators';
import { ItemCarteService } from './item-carte.service';

@Injectable({
  providedIn: 'root'
})

export class AllergeneService {
  private allergenesFindUrl = environment.apiUrl + '/allergene/find/';
  private allergenesUpdateUrl = environment.apiUrl + '/allergene/update/';
  private allergeneDeleteUrl = environment.apiUrl + '/allergene/delete/';
  private allergeneAddUrl = environment.apiUrl + '/allergene/insert/';

  private allergenes: Observable<AllergeneI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllergenes(): Observable<AllergeneI[]> {
    if (!this.allergenes) {
      this.http.get<AllergeneI[]>(this.allergenesFindUrl).pipe(take(1)).subscribe(allergenes => {
        this.allergenes = new Observable<AllergeneI[]>(observe => {
          observe.next(allergenes);
          observe.complete;
        })
      })
      return this.http.get<AllergeneI[]>(this.allergenesFindUrl);
    }
    else {
      return this.allergenes;
    }
  }

  resetList(): void {
    this.allergenes = null;
  }

  updateAllergene(allergene: AllergeneI): Observable<any> {
    this.itemCarteService.resetList;
    return this.http.put(this.allergenesUpdateUrl, allergene, this.httpOptionsUpdate);
  }

  deleteAllergene(allergene: AllergeneI): Observable<any> {
    this.resetList;
    this.itemCarteService.resetList;
    var finalUrl = this.allergeneDeleteUrl + allergene.id;
    return this.http.delete(finalUrl);
  }

  addAllergene(allergene: AllergeneI): Observable<AllergeneI> {
    return this.http.put<AllergeneI>(this.allergeneAddUrl, allergene, this.httpOptionsUpdate);
  }

  constructor(private itemCarteService: ItemCarteService, private http: HttpClient) { }
}
