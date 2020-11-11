import { Injectable } from '@angular/core';
import { ImageCategorieI } from '../interfaces/ImageCategorie'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environement/environement'
import { take } from 'rxjs/operators';
import { ImageService } from './image.service';

@Injectable({
    providedIn: 'root'
})

export class ImageCategorieService {
    private imageCategoriesFindUrl = environment.apiUrl + '/imageCategorie/find/';
    private imageCategoriesUpdateUrl = environment.apiUrl + '/imageCategorie/update/';
    private imageCategorieDeleteUrl = environment.apiUrl + '/imageCategorie/delete/';
    private imageCategorieAddUrl = environment.apiUrl + '/imageCategorie/insert/';

    private imageCategorie: Observable<ImageCategorieI[]>;

    private httpOptionsUpdate = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getImageCategories(): Observable<ImageCategorieI[]> {
        if (!this.imageCategorie) {
             this.refreshList();
             return this.http.get<ImageCategorieI[]>(this.imageCategoriesFindUrl);
        }
        else {
            return this.imageCategorie;
        }
    }

    refreshList(): void {
        this.http.get<ImageCategorieI[]>(this.imageCategoriesFindUrl).pipe(take(1)).subscribe(imageCategorie => {
            this.imageCategorie = new Observable<ImageCategorieI[]>(observe => {
                observe.next(imageCategorie);
                observe.complete
            })
        })
    }

    updateImageCategorie(imageCategorie: ImageCategorieI): Observable<any> {
        this.imageService.getImages().pipe(take(1)).subscribe(images=>{
            for( let image of images)
            {
                if(image.categorie.id==imageCategorie.id)
                {
                    image.categorie=imageCategorie;
                    this.imageService.updateImage(image).pipe(take(1)).subscribe();
                }
            }
        })
        return this.http.put(this.imageCategoriesUpdateUrl, imageCategorie, this.httpOptionsUpdate);
    }

    deleteImageCategorie(imageCategorie: ImageCategorieI): Observable<any> {
        var finalUrl = this.imageCategorieDeleteUrl + imageCategorie.id;
        console.log(finalUrl);
        return this.http.delete(finalUrl);
    }

    addImageCategorie(imageCategorie: ImageCategorieI): Observable<ImageCategorieI> {
        return this.http.put<ImageCategorieI>(this.imageCategorieAddUrl, imageCategorie, this.httpOptionsUpdate);
    }

    constructor(private imageService:ImageService,private http: HttpClient) { }

}