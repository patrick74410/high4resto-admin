import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { environment } from 'src/app/environement/environement';
import { Util } from 'src/app/environement/util';
import { ImageCategorieI } from 'src/app/interfaces/ImageCategorie';
import { ImageI } from 'src/app/interfaces/ImageI';
import { MessageI } from 'src/app/interfaces/MessageI';
import { WebConfigI } from 'src/app/interfaces/WebConfigI';
import { AlertService } from 'src/app/rootComponent/comfirm-dialog/alert.service';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { ExpireService } from 'src/app/services/expire.service';
import { ImageCategorieService } from 'src/app/services/ImageCategorie.service';
import { WebConfigService } from 'src/app/services/web-config.service';

declare var bootstrap:any;

@Component({
  selector: 'app-web-config',
  templateUrl: './web-config.component.html',
  styleUrls: ['./web-config.component.css']
})

export class WebConfigComponent implements OnInit {
  webConfig:WebConfigI;
  util = new Util();
  selectedLogo: ImageI;
  categories:ImageCategorieI[];

  updateForm = new FormGroup({
    title:new FormControl(''),
    googleMapApi:new FormControl(''),
    qty:new FormControl(''),
    caroussel:new FormControl(''),
    auth0Key:new FormControl(''),
    auth0Domain:new FormControl(''),
  })

  urlDownload:string=environment.apiUrl+"/images/download/";

  compareByID(itemOne, itemTwo) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }

  addImage(image: ImageI):void
  {
    this.selectedLogo=image;
  }

  showImageUpdateModal(): void
  {
    var updateImageModal=new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    updateImageModal.show();
  }

  save(): void
  {
    this.webConfig.caroussel=this.updateForm.get("caroussel").value;
    this.webConfig.googleMapApi=this.updateForm.get("googleMapApi").value;
    this.webConfig.title=this.updateForm.get("title").value;
    this.webConfig.logo=this.selectedLogo;
    this.webConfig.qty=this.updateForm.get("qty").value;
   this.webConfig.auth0Domain=this.updateForm.get("auth0Domain").value;
    this.webConfig.auth0Key=this.updateForm.get("auth0Key").value;
    this.webConfigService.updateWebConfig(this.webConfig).pipe(take(1)).subscribe(t=>{
      const message:MessageI={content:'La configuration du site web a bien été enregistrée',level:'Info'};
      this.messageService.add(message);
    })
  }

  getWebConfigs(): void
  {
    this.webConfigService.getWebConfigs().pipe(take(1)).subscribe(webConfigs=>{
      this.webConfig= webConfigs[0];
      this.selectedLogo=this.webConfig.logo;
      this.updateForm.patchValue({
        title:this.webConfig.title,
        caroussel:this.webConfig.caroussel,
        googleMapApi:this.webConfig.googleMapApi,
        qty:this.webConfig.qty,
        auth0Key:this.webConfig.auth0Key,
        auth0Domain:this.webConfig.auth0Domain,
      });
    });
  }

  constructor(private imageCategorieService: ImageCategorieService,private webConfigService: WebConfigService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.expireService.check;
    this.getWebConfigs();
    this.imageCategorieService.getImageCategories().pipe(take(1)).subscribe(categories=>{
      this.categories=categories;
    })
  }

}
