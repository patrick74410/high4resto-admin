import { Injectable } from '@angular/core';
import { ImageI } from '../interfaces/imageI'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams, HttpRequest } from '@angular/common/http'
import { environment } from '../environement/environement';
import { take } from 'rxjs/operators';
import { ImageCategorieI } from '../interfaces/ImageCategorie';

import { IdentiteService } from './identite.service';
import { ItemCarteService } from './item-carte.service';
import { CategorieService } from './categorie.service';
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
    console.log(link);
    console.log(alt);
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
    this.identiteService.getIdentites().pipe(take(1)).subscribe(identites => {
      for (let identite of identites) {
        if (identite.logo.id == image.id) {
          identite.logo = image;
          this.identiteService.updateIdentite(identite).pipe(take(1)).subscribe();
        }
      }
    })
    this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items => {
      for (let item of items) {
        if (item.sourceImage.id == image.id) {
          item.sourceImage = image;
          this.itemCarteService.updateItem(item).pipe(take(1)).subscribe();
        }
      }
    })
    this.categorieService.getCategories().pipe(take(1)).subscribe(categories => {
      for (let categorie of categories) {
        if (categorie.iconImage.id == image.id) {
          categorie.iconImage = image;
          this.categorieService.updateCategorie(categorie).pipe(take(1)).subscribe();
        }
        if (categorie.image.id == image.id) {
          categorie.image = image;
          this.categorieService.updateCategorie(categorie).pipe(take(1)).subscribe();
        }
      }
    })
    this.articleService.getArticles().pipe(take(1)).subscribe(articles => {
      for (let article of articles) {
        if (article.image.id == image.id) {
          article.image = image;
          this.articleService.updateArticle(article).pipe(take(1)).subscribe();
        }
      }
    })
    this.categorieArticleService.getArticleCategories().pipe(take(1)).subscribe(categoriesArticles => {
      for (let categorieArticle of categoriesArticles) {
        if (categorieArticle.iconImage.id == image.id) {
          categorieArticle.iconImage = image;
          this.categorieArticleService.updateArticleCategorie(categorieArticle).pipe(take(1)).subscribe();
        }
        if (categorieArticle.image.id == image.id) {
          categorieArticle.image = image;
          this.categorieArticleService.updateArticleCategorie(categorieArticle).pipe(take(1)).subscribe();
        }
      }
    })

    return this.http.put(this.imageUpdateUrl, image, this.httpOptionsUpdate);
  }

  deleteImage(image: ImageI): Observable<any> {
    var finalUrl = this.imageDeleteUrl + image.id;
    return this.http.delete(finalUrl);
  }
  deleteImageGrid(image: ImageI): Observable<any> {
    var finalUrl = this.imageDeleteGridUrl + image.gridId;
    return this.http.delete(finalUrl);
  }



  constructor(private identiteService: IdentiteService, private itemCarteService: ItemCarteService, private categorieService: CategorieService, private categorieArticleService: ArticleCategorieService, private articleService: ArticleService, private http: HttpClient) { }
}

export interface HttpParamsOptions {
  fromString?: string;
  fromObject?: {
    [param: string]: string | string[];
  };
  encoder?: HttpParameterCodec;
}