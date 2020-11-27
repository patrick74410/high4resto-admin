import { Component, OnInit } from '@angular/core';
import { ImageCategorieService } from '../../services/ImageCategorie.service'
import { ImageCategorieI } from '../../interfaces/ImageCategorie'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/MessageI'
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageI } from 'src/app/interfaces/ImageI';
import { environment } from '../../environement/environement';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';

declare var bootstrap: any;

@Component({
  selector: 'app-imageCategorie',
  templateUrl: './imageCategorie.component.html',
  styleUrls: ['./imageCategorie.component.css']
})
export class ImageCategorieComponent implements OnInit {
  imageCategories: ImageCategorieI[];
  selectedImageCategorie: ImageCategorieI;
  addImageCategorie: ImageCategorieI = { name: "", description: "", visible: false };
  urlDownload: string = environment.apiUrl + "/images/download/";

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    visible: new FormControl(''),
  });

  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    visible: new FormControl(''),
  });

  updateModal: any;
  addModal: any;


  addImage(topImage: ImageI) {
    this.addImageCategorie.topImage = topImage;
  }

  updateImage(topImage: ImageI) {
    this.selectedImageCategorie.topImage = topImage;
  }

  showAddImage() {
    var updateImageModal = new bootstrap.Modal(document.getElementById('addImageModal'), {});
    updateImageModal.show();
  }
  showUpdateImage() {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    updateImageModal.show();
  }

  onSelect(imageCategorie: ImageCategorieI) {
    this.selectedImageCategorie = imageCategorie;
  }

  addData(): void {
    this.addImageCategorie.name = this.addForm.get("name").value;
    this.addImageCategorie.description = this.addForm.get("description").value;
    this.addImageCategorie.visible = this.addForm.get("visible").value;
    const message: MessageI = { content: 'La catégorie à été rajouté', level: 'Info' }

    this.imageCategorieService.addImageCategorie(this.addImageCategorie)
      .pipe(take(1)).subscribe(imageCategorie => {
        this.imageCategorieService.resetList();
        this.imageCategories.push(imageCategorie);
        this.messageService.add(message);
        this.addForm.reset();
        document.getElementById("closeAddModal").click();
      });
  }

  delete(imageCategorie: ImageCategorieI): void {
    const message: MessageI = { content: 'L\'élément à été supprimé', level: 'Attention' }
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la imageCategorie ?", function () {
      that.imageCategorieService.deleteImageCategorie(imageCategorie).pipe(take(1)).subscribe(test => {
        var index = that.imageCategories.indexOf(imageCategorie);
        that.imageCategories.splice(index, 1);
        that.messageService.add(message);
      }
      );
      that.selectedImageCategorie = null;
    }, function () {

    });

  }

  updateDataForm(selectedImageCategorie: ImageCategorieI): void {
    this.updateForm.patchValue({ name: selectedImageCategorie.name, description: selectedImageCategorie.description, visible: selectedImageCategorie.visible });
    this.updateModal.show();
    this.selectedImageCategorie = selectedImageCategorie;
  }

  onUpdate(): void {
    const message: MessageI = { content: 'La modification a été enregistrée', level: 'Info' };
    this.selectedImageCategorie.name = this.updateForm.get("name").value;
    this.selectedImageCategorie.description = this.updateForm.get("description").value;
    this.selectedImageCategorie.visible = this.updateForm.get("visible").value;
    this.imageCategorieService.updateImageCategorie(this.selectedImageCategorie)
      .pipe(take(1)).subscribe(item => {
        this.messageService.add(message);
        document.getElementById("closeUpdateModal").click();
      });
  }

  getImageCategories(): void {
    this.imageCategorieService.getImageCategories().pipe(take(1)).subscribe(imageCategories => this.imageCategories = imageCategories);
  }

  constructor(public authenticationService: AuthentificationService,private imageCategorieService: ImageCategorieService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.getImageCategories();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'), {});
  }

}
