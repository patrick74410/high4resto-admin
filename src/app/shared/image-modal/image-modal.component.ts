import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from '../../environement/environement';
import { ImageI } from '../../interfaces/ImageI';
import { ImageService } from '../../services/image.service';
import { Util } from '../../environement/util';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCategorieI } from 'src/app/interfaces/ImageCategorie';
import { ImageCategorieService } from 'src/app/services/ImageCategorie.service';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
declare var bootstrap: any;

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})

export class ImageModalComponent implements OnInit {
  images: ImageI[];
  categories: ItemCategorieI[];
  util = new Util();
  urlDownload: string = environment.apiUrl + "/images/download/";
  selectImage: ImageI;


  @Output()
  newItemEvent = new EventEmitter<ImageI>();
  @Input()
  idModal: string;
  @Input()
  showAfterClose: string;


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
      var id = ((this.filterForm.get("filter").value as ImageCategorieI).id);
      this.images = items.filter(a => a.categorie).filter(a => a.categorie.id == id)
    });
  }

  addNewItem(value: ImageI) {
    this.selectImage = value;
    this.newItemEvent.emit(value);
  }


  show(): void {
    if (this.showAfterClose) {
      var parentModal = new bootstrap.Modal(document.getElementById(this.showAfterClose), {});
      parentModal.show();
    }
  }

  constructor(private imageCategorieService: ImageCategorieService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageCategorieService.getImageCategories().pipe(take(1)).subscribe(categories => {
      this.categories = categories;
    })
  }

}
