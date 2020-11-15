import { Injectable } from '@angular/core';
import {WebConfigI} from '../interfaces/WebConfigI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WebConfigService {
  private webConfigsFindUrl = environment.apiUrl+'/webConfig/find/';
  private webConfigsUpdateUrl = environment.apiUrl+'/webConfig/update/';
  private webConfigAddUrl= environment.apiUrl+'/webConfig/insert/';

  private webConfig:Observable<WebConfigI[]>;
 
  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getWebConfigs(): Observable<WebConfigI[]>{
    if(!this.webConfig)
    {
      this.refreshList();
      return this.http.get<WebConfigI[]>(this.webConfigsFindUrl);
    }
    else
    {
      return this.webConfig;
    }
  }

  refreshList(): void {
    this.http.get<WebConfigI[]>(this.webConfigsFindUrl).pipe(take(1)).subscribe(webConfig=>{
      this.webConfig=new Observable<WebConfigI[]>(observe=>{
        observe.next(webConfig);
        observe.complete;
      })
    })
  }

  updateWebConfig(webConfig:WebConfigI): Observable<any> {
    return this.http.put(this.webConfigsUpdateUrl,webConfig,this.httpOptionsUpdate);
  }

  addWebConfig(webConfig:WebConfigI): Observable<WebConfigI> {
    return this.http.put<WebConfigI>(this.webConfigAddUrl,webConfig,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { }
}
