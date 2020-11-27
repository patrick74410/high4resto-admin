import { Component, OnInit } from '@angular/core';
import { IdentiteService } from '../../services/identite.service'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/MessageI'
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { IdentiteI } from '../../interfaces/IdentiteI'
import { KeyMapI } from '../../interfaces/KeymapI';
import { FormControl, FormGroup } from '@angular/forms';
import { GpsI } from '../../interfaces/GpsI';
import { ImageI } from '../../interfaces/ImageI';
import { ImageService } from '../../services/image.service'
import { environment } from '../../environement/environement';
import { Util } from '../../environement/util'
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';

declare var bootstrap: any;

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styleUrls: ['./identite.component.css']
})

export class IdentiteComponent implements OnInit {
  identite: IdentiteI;
  util = new Util();
  selectImage: ImageI;

  updateForm = new FormGroup({
    nomEtablissement: new FormControl(''),
    zip: new FormControl(''),
    city: new FormControl(''),
    number: new FormControl(''),
    adresse: new FormControl(''),
    complement: new FormControl(''),
    siret: new FormControl(''),
    longitude: new FormControl(''),
    latitude: new FormControl(''),
    description: new FormControl('')
  })

  urlDownload: string = environment.apiUrl + "/images/download/";

  addItem(newItem: ImageI) {
    this.selectImage = newItem;
  }

  showImageUpdateModal(): void {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    updateImageModal.show();
  }

  deleteKey(contact: KeyMapI): void {
    var index = this.identite.contact.indexOf(contact);
    this.identite.contact.splice(index, 1);
  }

  add(key, value): void {
    this.identite.contact.push({ key: key.value, value: value.value } as KeyMapI);
  }

  save(): void {
    this.identite.adresse = this.updateForm.get("adresse").value;
    this.identite.city = this.updateForm.get('city').value;
    this.identite.complement = this.updateForm.get('complement').value;
    this.identite.coordonnee = { longitude: this.updateForm.get('longitude').value, latitude: this.updateForm.get('latitude').value } as GpsI;
    this.identite.nomEtablissement = this.updateForm.get('nomEtablissement').value;
    this.identite.number = this.updateForm.get('number').value;
    this.identite.siret = this.updateForm.get('siret').value;
    this.identite.zip = this.updateForm.get('zip').value;
    this.identite.logo = this.selectImage;
    this.identite.description = this.updateForm.get('description').value;
    this.identiteService.updateIdentite(this.identite).pipe(take(1)).subscribe(t => {
      const message: MessageI = { content: 'Les imformations de l\'établissement on été enregistrées', level: 'Info' };
      this.messageService.add(message);
    });
  }

  getIdentite(): void {
    this.identiteService.getIdentites().pipe(take(1)).subscribe(identite => {
      this.identite = identite[0];
      this.selectImage = this.identite.logo;
      this.updateForm.patchValue({
        nomEtablissement: this.identite.nomEtablissement,
        zip: this.identite.zip,
        city: this.identite.city,
        number: this.identite.number,
        adresse: this.identite.adresse,
        complement: this.identite.complement,
        siret: this.identite.siret,
        longitude: this.identite.coordonnee.longitude,
        latitude: this.identite.coordonnee.latitude,
        description: this.identite.description
      });
    })
  }



  constructor(public authenticationService: AuthentificationService,private identiteService: IdentiteService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.expireService.check;
    this.getIdentite();

  }

}
