import { Injectable } from '@angular/core';
import { AlbumI } from '../interfaces/AlbumI'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {environment} from '../environement/environement'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumsFindUrl = environment.apiUrl+'/album/find/';
  private albumsUpdateUrl = environment.apiUrl+'/album/update/';
  private albumDeleteUrl= environment.apiUrl+'/album/delete/';
  private albumAddUrl= environment.apiUrl+'/album/insert/';
  private albums:Observable<AlbumI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAlbums(): Observable<AlbumI[]>{
    if(!this.albums)
    {
      this.refreshList();
      return this.http.get<AlbumI[]>(this.albumsFindUrl);
    }
    else
    {
      return this.albums;
    }
  }

  refreshList(): void {
    this.http.get<AlbumI[]>(this.albumsFindUrl).pipe(take(1)).subscribe(albums=>{
      this.albums=new Observable<AlbumI[]>(observe=>{
        observe.next(albums);
        observe.complete();
      })
    })
  }

  updateAlbum(album:AlbumI): Observable<any> {
   return this.http.put(this.albumsUpdateUrl,album,this.httpOptionsUpdate);
  }

  deleteAlbum(album:AlbumI): Observable<any> {
    var finalUrl=this.albumDeleteUrl+album.id;
    return this.http.delete(finalUrl);
  }

  addAlbum(album:AlbumI):Observable<AlbumI> {
    return this.http.put<AlbumI>(this.albumAddUrl,album,this.httpOptionsUpdate);
  }

  constructor(private http: HttpClient) { } 
}
