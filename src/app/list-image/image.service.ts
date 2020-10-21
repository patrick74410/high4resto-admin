import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ImageI } from '../interfaces/imageI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams, HttpRequest } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesFindUrl = 'http://localhost:8080/images/find/';
  private imageDeleteUrl= 'http://localhost:8080/images/delete/';
  private imageDeleteGridUrl= 'http://localhost:8080/images/deleteGrid/';
  private imageUploadUrl='http://localhost:8080/images/upload/';
  private imageUpdateUrl='http://localhost:8080/images/update/';
  private httpOptionsUpdate = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  uploadImage(file:File,description:string,group:string):Observable<any> {
    const paramsFile = new FormData();
    paramsFile.append('file',file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', undefined);
    const myObject: any = { description: description, group: group, fileName: file.name};
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };

    return this.http.post(this.imageUploadUrl,paramsFile,options);
  }

  getImages():Observable<ImageI[]>{
    return this.http.get<ImageI[]>(this.imagesFindUrl);
  }

  updateImage(image:ImageI): Observable<any> {
    return this.http.put(this.imageUpdateUrl,image,this.httpOptionsUpdate);
   }
 
   deleteImage(image:ImageI): Observable<any> {
    var finalUrl=this.imageDeleteUrl+image.id;
    return this.http.delete(finalUrl);
  }
  deleteImageGrid(image:ImageI): Observable<any> {
    var finalUrl=this.imageDeleteGridUrl+image.gridId;
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