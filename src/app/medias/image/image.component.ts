import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgxPicaService, NgxPicaErrorInterface, NgxPicaResizeOptionsInterface } from '@digitalascetic/ngx-pica';
import { AspectRatioOptions, ExifOptions } from '@digitalascetic/ngx-pica/lib/ngx-pica-resize-options.interface';
import { ImageI } from '../../interfaces/imageI'
import { ImageService } from '../../services/image.service'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service';
import { MessageI } from '../../interfaces/messageI';
import { ExpireService } from '../../services/expire.service';
import { environment } from '../../environement/environement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Util } from '../../environement/util';
import { ImageCategorieService } from 'src/app/services/ImageCategorie.service';
import { ImageCategorieI } from 'src/app/interfaces/ImageCategorie';

declare var bootstrap: any;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {
  categories: ImageCategorieI[] = [];
  imgURL: any;
  tpFile: File;
  images: ImageI[];
  selectedImage: ImageI;
  name: String;
  util = new Util();
  urlDownload: String = environment.apiUrl + "/images/download/";
 
  compareByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }

  addForm = new FormGroup(
    {
      description: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      alt: new FormControl(''),
      link: new FormControl(''),
      widht: new FormControl('', Validators.required),
      heigth: new FormControl('', Validators.required),
      keepRatio: new FormControl('', Validators.required)
    }
  )

  updateForm = new FormGroup({
    description: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    alt: new FormControl(''),
    link: new FormControl(''),
  })

  updateModal: any;
  addModal: any;

  filterForm = new FormGroup({
    filter: new FormControl('', Validators.required)
  });


  compareFn = this._compareFn.bind(this);

  _compareFn(a, b) {
    try {
      return a.id === b.id;
    }
    catch (Err) {
      return 0;
    }
  }

  filter(): void {
    this.imageService.getImages().pipe(take(1)).subscribe(items => {
      var id=((this.filterForm.get("filter").value as ImageCategorieI).id);
      this.images = items.filter(a => a.categorie.id == id)
    });
  }

  addData(): void {

      var fileImages: File;
      var description = this.addForm.get("description").value;
      var categorie = this.addForm.get("categorie").value;
      var link = this.addForm.get("link").value;
      var alt = this.addForm.get("alt").value;
  
      this._ngxPicaService.resizeImage(this.tpFile, this.addForm.get("widht").value, this.addForm.get("heigth").value, new ImageResizeOptions(this.addForm.get("keepRatio").value))
        .pipe(take(1)).subscribe((imageResized: File) => {
          let reader: FileReader = new FileReader();
  
          reader.addEventListener('load', (event: any) => {
            fileImages = event.target.result;
          }, false);
          reader.readAsArrayBuffer(imageResized);
          this.imageService.uploadImage(new File([imageResized], this.tpFile.name), description, categorie, alt, link).pipe(take(1)).subscribe(test => {
            this.addForm.patchValue({ widht: 800, height: 600 })
            this.imgURL = "";
            this.name = "";
            this.refreshList();
            setTimeout( () => { 
              this.filter();
             }, 1000 );
            const message: MessageI = { content: 'L\'image a bien été rajoutée', level: 'Info' }
            this.messageService.add(message);
            this.addForm.reset();
            this.addModal.hide();
  
          });
        }, (err: NgxPicaErrorInterface) => {
          const message: MessageI = { content: 'Il y a eu une erreux lors de l\'importation de l\'image', level: 'Erreur' }
          this.messageService.add(message);
          throw err.err;
        });  

  }

  updateDataForm(selectedImage: ImageI): void {
    this.updateForm.patchValue({ description: selectedImage.description, categorie: selectedImage.categorie, alt: selectedImage.alt, link: selectedImage.link });
    this.updateModal.show();
    this.selectedImage = selectedImage;
  }

  onUpdate(): void {
    const message: MessageI = { content: 'La modification a bien été effectuée', level: 'info' }
    this.selectedImage.description = this.updateForm.get("description").value;
    this.selectedImage.categorie = this.updateForm.get("categorie").value;
    this.selectedImage.link = this.updateForm.get("link").value;
    this.selectedImage.alt = this.updateForm.get("alt").value;
    this.imageService.updateImage(this.selectedImage).pipe(take(1)).subscribe(item => {
      this.messageService.add(message);
      this.updateModal.hide()
    });
  }

  refreshList(): void {
    this.imageService.refreshList();
  }

  deleteImage(image: ImageI): void {
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'image ?", function () {
      that.selectedImage = null;
      that.imageService.deleteImageGrid(image).pipe(take(1)).subscribe();
      that.imageService.deleteImage(image).pipe(take(1)).subscribe(test => {
        var index = that.images.indexOf(image);
        that.images.splice(index, 1);
        const message: MessageI = { content: 'l\'image à bien été supprimée', level: 'Attention' }
        that.messageService.add(message);
      }
      );
    }, function () {

    });
  }

  public handleFiles(event: any) {
    const files: File[] = event.target.files;
    this.tpFile = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.name = files[0].name;
  }

  constructor(private categorieService: ImageCategorieService, private messageService: MessageService, private _ngxPicaService: NgxPicaService, private imageService: ImageService, private alertService: AlertService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.expireService.check();
    this.addForm.patchValue({ widht: 800, heigth: 600 })
    this.updateModal = new bootstrap.Modal(document.getElementById('updateImage'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addImage'), {});
    this.categorieService.getImageCategories().pipe(take(1)).subscribe(categories => {
      this.categories = categories;
    })
  }

}

export class ImageResizeOptions implements NgxPicaResizeOptionsInterface {
  quality?: number;
  alpha?: boolean = true;
  unsharpAmount?: number;
  unsharpRadius?: number;
  unsharpThreshold?: number;
  exifOptions = new ImageExifOption(true);
  aspectRatio: ImageAspectRatioOptions;
  constructor(ratio: boolean) {
    this.aspectRatio = new ImageAspectRatioOptions(ratio);
  }
}

export class ImageAspectRatioOptions implements AspectRatioOptions {
  keepAspectRatio: boolean;
  forceMinDimensions?: boolean;

  constructor(keepAspectRatio: boolean, forceMinDimensions?: boolean) {
    this.keepAspectRatio = keepAspectRatio;
    this.forceMinDimensions = forceMinDimensions;
  }
}

export class ImageExifOption implements ExifOptions {
  constructor(forceExifOrientation: boolean) {
    this.forceExifOrientation = forceExifOrientation;
  }
  forceExifOrientation: boolean;

}
