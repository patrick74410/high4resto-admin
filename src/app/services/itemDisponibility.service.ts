import { Injectable } from '@angular/core';
import { ItemDisponibilityI } from '../interfaces/ItemDisponibility'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from '../environement/environement'
import { take } from 'rxjs/operators';
import { ItemCarteService } from './item-carte.service';


@Injectable({
  providedIn: 'root'
})

export class ItemDisponibilityService {
    private itemDisponibilitysFindUrl = environment.apiUrl+'/itemDisponibility/find/';
    private itemDisponibilitysUpdateUrl = environment.apiUrl+'/itemDisponibility/update/';
    private itemDisponibilityDeleteUrl= environment.apiUrl+'/itemDisponibility/delete/';
    private itemDisponibilityAddUrl=environment.apiUrl+'/itemDisponibility/insert/';

    private itemDisponibilitys:Observable<ItemDisponibilityI[]>;

    private httpOptionsUpdate = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    getDisponibilitys(): Observable<ItemDisponibilityI[]>{
      this.itemCarteService.resetList();
      if(!this.itemDisponibilitys)
      {
        this.http.get<ItemDisponibilityI[]>(this.itemDisponibilitysFindUrl).pipe(take(1)).subscribe(itemDisponibilitys=>{
          this.itemDisponibilitys=new Observable<ItemDisponibilityI[]>(observe=>{
            observe.next(itemDisponibilitys);
            observe.complete;
          })
        })
          return this.http.get<ItemDisponibilityI[]>(this.itemDisponibilitysFindUrl);
      }
      else
      {
        return this.itemDisponibilitys;
      }
    }
  
    gets(): Observable<ItemDisponibilityI[]>{
        return this.http.get<ItemDisponibilityI[]>(this.itemDisponibilitysFindUrl);
    }
  
    getOne(id:string): Observable<ItemDisponibilityI>{
      return this.http.get<ItemDisponibilityI>(this.itemDisponibilitysFindUrl+id);
  }

    resetList(): void {
      this.itemDisponibilitys=null;
    }  
    
    updateDisponibility(itemDisponibility:ItemDisponibilityI): Observable<any> {
      this.itemCarteService.resetList();
     return this.http.put(this.itemDisponibilitysUpdateUrl,itemDisponibility,this.httpOptionsUpdate);
    }
  
    deleteDisponibility(itemDisponibility:ItemDisponibilityI): Observable<any> {
      var finalUrl=this.itemDisponibilityDeleteUrl+itemDisponibility.id;
      return this.http.delete(finalUrl);
    }
  
    addDisponibility(itemDisponibility:ItemDisponibilityI):Observable<ItemDisponibilityI> {
      return this.http.put<ItemDisponibilityI>(this.itemDisponibilityAddUrl,itemDisponibility,this.httpOptionsUpdate);
    }

    constructor(private itemCarteService:ItemCarteService,private http: HttpClient) { }    
}