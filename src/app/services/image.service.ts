import { Injectable } from '@angular/core';
import { ImageI } from '../interfaces/ImageI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams, HttpRequest } from '@angular/common/http'
import { environment } from '../environement/environement';
import { take } from 'rxjs/operators';
import { ImageCategorieI } from '../interfaces/ImageCategorie';

import { IdentiteService } from './identite.service';
import { ItemCarteService } from './item-carte.service';
import { ArticleCategorieService } from './categorieArticle.service';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesFindUrl = environment.apiUrl + '/images/find/';
  private imageDeleteUrl = environment.apiUrl + '/images/delete/';
  private imageDeleteGridUrl = environment.apiUrl + '/images/deleteGrid/';
  private imageUploadUrl = environment.apiUrl + '/images/upload/';
  private imageUpdateUrl = environment.apiUrl + '/images/update/';

  private images: Observable<ImageI[]>;

  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  uploadImage(file: File, description: string, categorie: ImageCategorieI, alt: string, link: string): Observable<any> {
    const paramsFile = new FormData();
    paramsFile.append('file', file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', undefined);
    const myObject: any = { description: description, categorie: JSON.stringify(categorie), fileName: file.name, link: link, alt: alt };
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };

    return this.http.post(this.imageUploadUrl, paramsFile, options);
  }

  getImages(): Observable<ImageI[]> {
    if (!this.images) {
      this.http.get<ImageI[]>(this.imagesFindUrl).pipe(take(1)).subscribe(images => {
        this.images = new Observable<ImageI[]>(observe => {
          observe.next(images);
          observe.complete
        })
      })
      return this.http.get<ImageI[]>(this.imagesFindUrl);
    }
    else {
      return this.images;
    }
  }

  resetList(): void {
    this.images=null;
  }

  updateImage(image: ImageI): Observable<any> {

    return this.http.put(this.imageUpdateUrl, image, this.httpOptionsUpdate);
  }

  deleteImage(image: ImageI): Observable<any> {
    this.resetList();
    var finalUrl = this.imageDeleteUrl + image.id;
    return this.http.delete(finalUrl);
  }

  deleteImageGrid(image: ImageI): Observable<any> {
    this.resetList;
    var finalUrl = this.imageDeleteGridUrl + image.gridId;
    return this.http.delete(finalUrl);
  }



  constructor(private http: HttpClient) { }
}

export interface HttpParamsOptions {
  fromString?: string;
  fromObject?: {
    [param: string]: string | string[];
  };
  encoder?: HttpParameterCodec;
}