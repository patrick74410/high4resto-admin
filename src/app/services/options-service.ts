import { Injectable } from '@angular/core';
import { OptionsItemI } from '../interfaces/OptionsItem'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../environement/environement'
import { take } from 'rxjs/operators';
import { ItemCarteService } from './item-carte.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsItemService {
  private optionsItemsFindUrl = environment.apiUrl+'/optionsItem/find/';
  private optionsItemsUpdateUrl = environment.apiUrl+'/optionsItem/update/';
  private optionsItemDeleteUrl= environment.apiUrl+'/optionsItem/delete/';
  private optionsItemAddUrl=environment.apiUrl+'/optionsItem/insert/';

  private options:Observable<OptionsItemI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getOptionsItems(): Observable<OptionsItemI[]>{
    if(!this.options)
    {
      this.http.get<OptionsItemI[]>(this.optionsItemsFindUrl).pipe(take(1)).subscribe(options=>{
        this.options=new Observable<OptionsItemI[]>(observe=>{
          observe.next(options);
          observe.complete;
        })
      })
      return this.http.get<OptionsItemI[]>(this.optionsItemsFindUrl);
    }
    else
    {
      return this.options;
    }
  }

  resetList(): void {
    this.options=null;
  }

  updateOption(OptionsItem:OptionsItemI): Observable<any> {
    this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items => {
      for(let item of items)
      {
        for(let choixI of item.options)
        {
          if(choixI.id==OptionsItem.id)
          {
            item.options[(item.options.indexOf(choixI))]=OptionsItem;
          }
        }
       this.itemCarteService.updateItem(item).pipe(take(1)).subscribe();
      }     
    });
   return this.http.put(this.optionsItemsUpdateUrl,OptionsItem,this.httpOptionsUpdate);
  }

  deleteOption(OptionsItem:OptionsItemI): Observable<any> {
    var finalUrl=this.optionsItemDeleteUrl+OptionsItem.id;
    console.log(finalUrl);
    return this.http.delete(finalUrl);
  }

  addOption(OptionsItem:OptionsItemI):Observable<OptionsItemI> {
    return this.http.put<OptionsItemI>(this.optionsItemAddUrl,OptionsItem,this.httpOptionsUpdate);
  }

  constructor(private itemCarteService:ItemCarteService,private http: HttpClient) { }
}
