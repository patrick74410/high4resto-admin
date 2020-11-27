import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { environment } from '../../environement/environement';
import { Util } from '../../environement/util';
import { ImageI } from '../../interfaces/ImageI';
import { ItemCategorieI } from '../../interfaces/ItemCategorieI';
import { MessageI } from '../../interfaces/MessageI';
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service';
import { ExpireService } from '../../services/expire.service';
import { ItemCategorieService } from '../../services/itemCategorie.service';

declare var bootstrap: any;

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})

export class CategorieComponent implements OnInit {
  categories: ItemCategorieI[];
  selectedCategorie: ItemCategorieI;
  addCategorie: ItemCategorieI = { name: "", description: "" };
  util = new Util();
  urlDownload: string = environment.apiUrl + "/images/download/";

  updateImage(image: ImageI) {
    this.selectedCategorie.image = image;
  }
  updateIcon(image: ImageI) {
    this.selectedCategorie.iconImage = image;
  }
  addImage(image: ImageI) {
    this.addCategorie.image = image;
  }
  addIcon(image: ImageI) {
    this.addCategorie.iconImage = image;
  }

  showUpdateImage() {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    updateImageModal.show();
  }
  showUpdateIcon() {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateIconModal'), {});
    updateImageModal.show();
  }
  showAddImage() {
    var updateImageModal = new bootstrap.Modal(document.getElementById('addImageModal'), {});
    updateImageModal.show();
  }
  showAddIcon() {
    var updateImageModal = new bootstrap.Modal(document.getElementById('addIconModal'), {});
    updateImageModal.show();
  }

  addForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    }
  )

  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  })

  updateModal: any;
  addModal: any;



  addData(): void {
    const message: MessageI = { content: 'La catégorie a été rajoutée', level: 'Info' }
    this.addCategorie.description = this.addForm.get("description").value;
    this.addCategorie.name = this.addForm.get("name").value.trim();
    this.addCategorie.order = this.categories.length + 1;
    if (!this.addCategorie.name) { return; }
    this.itemCategorieService.addCategorie(this.addCategorie).pipe(take(1))
      .subscribe(categorie => {
        this.itemCategorieService.resetList();
        this.categories.push(categorie)
        this.messageService.add(message);
        this.addForm.reset();
        document.getElementById("addClose").click();
      });
  }

  updateDataForm(selectedCategorie: ItemCategorieI): void {
    this.updateForm.patchValue({ name: selectedCategorie.name, description: selectedCategorie.description });
    this.updateModal.show();
    this.selectedCategorie = selectedCategorie;
  }

  onUpdate(): void {
    const message: MessageI = { content: 'La modification a été enregistrée', level: 'Info' }
    this.selectedCategorie.name = this.updateForm.get("name").value;
    this.selectedCategorie.description = this.updateForm.get("description").value;

    this.itemCategorieService.updateCategorie(this.selectedCategorie)
      .pipe(take(1)).subscribe(item => { this.messageService.add(message), document.getElementById("updateClose").click(); });
  }

  delete(categorie: ItemCategorieI): void {
    const message: MessageI = { content: 'L\'élément à été supprimé', level: 'Attention' }

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la catégorie ?", function () {
      that.itemCategorieService.deleteCategorie(categorie).pipe(take(1)).subscribe(test => {
        var index = that.categories.indexOf(categorie);
        that.categories.splice(index, 1);
        that.messageService.add(message);
      });

      that.categories.forEach((categorie, idx) => {
        categorie.order = idx + 1;
        that.itemCategorieService.updateCategorie(categorie).pipe(take(1)).subscribe();
      });
      that.selectedCategorie = null;
    }, function () {

    });
  }

  getCategories(): void {
    this.itemCategorieService.getCategories().pipe(take(1)).subscribe(categories => this.categories = categories.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    }));
  }

  drop(event: CdkDragDrop<string[]>) {
    const message: MessageI = { content: 'Les éléments ont été triés', level: 'Info' }

    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    this.categories.forEach((categorie, idx) => {
      categorie.order = idx + 1;
      this.itemCategorieService.updateCategorie(categorie).pipe(take(1)).subscribe();
    });

    this.messageService.add(message);
  }


  constructor(public authenticationService: AuthentificationService,private itemCategorieService: ItemCategorieService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.getCategories();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateCategorie'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addCategorie'), {});
  }

}
