import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement';
import { TrashI } from '../interfaces/tracability/Trash';

@Injectable({
    providedIn: 'root'
  })
  export class TrashService {
    private trashFindUrl = environment.apiUrl+'/trash/find/';
    private trashAddUrl=environment.apiUrl+'/trash/insert/';
    private trashDeleteUrl=environment.apiUrl+'/trash/insert/';

    private httpOptionsUpdate = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      getTrash(): Observable<TrashI[]>{
        return this.http.get<TrashI[]>(this.trashFindUrl);         
      }


      addTrash(trash:TrashI):Observable<TrashI> {
        return this.http.put<TrashI>(this.trashAddUrl,trash,this.httpOptionsUpdate);
      }     

      deleteTrash(trash:TrashI): Observable<any> {
        var finalUrl=this.trashDeleteUrl+trash.id+"/";
        return this.http.delete(finalUrl);
      }

      constructor(private http:HttpClient) { }

  }