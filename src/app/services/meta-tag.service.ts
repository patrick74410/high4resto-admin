import { Injectable } from '@angular/core';
import { MetaTagI } from '../interfaces/MetaTagI'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
  private metaTagsFindUrl = environment.apiUrl + '/metaTag/find/';
  private metaTagsUpdateUrl = environment.apiUrl + '/metaTag/update/';
  private metaTagAddUrl = environment.apiUrl + '/metaTag/insert/';

  private metas: Observable<MetaTagI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMetaTags(): Observable<MetaTagI[]> {
    if (!this.metas) {
      this.http.get<MetaTagI[]>(this.metaTagsFindUrl).pipe(take(1)).subscribe(metas => {
        this.metas = new Observable<MetaTagI[]>(observe => {
          observe.next(metas);
          observe.complete
        })
      })
      return this.http.get<MetaTagI[]>(this.metaTagsFindUrl);
    }
    else {
      return this.metas;
    }
  }

  resetList(): void {
    this.metas = null;
  }

  updateMetaTag(metaTag: MetaTagI): Observable<any> {
    return this.http.put(this.metaTagsUpdateUrl, metaTag, this.httpOptionsUpdate);
  }


  addMetaTag(metaTag: MetaTagI): Observable<MetaTagI> {
    return this.http.put<MetaTagI>(this.metaTagAddUrl, metaTag, this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }

}
