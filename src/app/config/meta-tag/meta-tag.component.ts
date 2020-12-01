import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { environment } from '../../environement/environement';
import { Util } from '../../environement/util';
import { ImageI } from '../../interfaces/ImageI';
import { KeyMapI } from '../../interfaces/KeymapI';
import { MessageI } from '../../interfaces/MessageI';
import { MetaTagI } from '../../interfaces/MetaTagI';
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service';
import { ExpireService } from '../../services/expire.service';
import { MetaTagService } from '../../services/meta-tag.service';

declare var bootstrap: any;

@Component({
  selector: 'app-meta-tag',
  templateUrl: './meta-tag.component.html',
  styleUrls: ['./meta-tag.component.css']
})

export class MetaTagComponent implements OnInit {
  twitterImage: ImageI;
  facebookImage: ImageI;
  metaTag: MetaTagI;
  util = new Util();
  updateForm = new FormGroup({
    description: new FormControl(''),
    keywords: new FormControl(''),
    author: new FormControl(''),
    facebookTitle: new FormControl(''),
    facebookDescription: new FormControl(''),
    facebookImage: new FormControl(''),
    twitterTitle: new FormControl(''),
    twitterDescription: new FormControl(''),
    twitterImage: new FormControl(''),
    twitterAuthor: new FormControl('')
  })

  urlDownload: string = environment.apiUrl + "/images/download/";

  selectTwitter(image: ImageI) {
    this.twitterImage = image;
    this.updateForm.patchValue({ twitterImage: this.urlDownload + image.gridId + '/' + image.fileName });
  }

  selectFacebook(image: ImageI) {
    this.facebookImage = image;
    this.updateForm.patchValue({ facebookImage: this.urlDownload + image.gridId + '/' + image.fileName });
  }

  showTwitter() {
    var selectTwitterImageModal = new bootstrap.Modal(document.getElementById('twitterModal'));
    selectTwitterImageModal.show();
  }

  showFacebook() {
    var selectFacebookImageModal = new bootstrap.Modal(document.getElementById('facebookModal'));
    selectFacebookImageModal.show();
  }


  deleteKey(other: KeyMapI) {
    var index = this.metaTag.other.indexOf(other);
    this.metaTag.other.splice(index, 1);
  }

  add(key, value): void {
    this.metaTag.other.push({ key: key.value, value: value.value } as KeyMapI);
  }

  save(): void {
    this.metaTag.author = this.updateForm.get('author').value;
    this.metaTag.description = this.updateForm.get('description').value;
    this.metaTag.facebookDescription = this.updateForm.get('facebookDescription').value;
    this.metaTag.facebookImage = this.updateForm.get('facebookImage').value;
    this.metaTag.facebookTitle = this.updateForm.get('facebookTitle').value;
    this.metaTag.keywords = this.updateForm.get('keywords').value;
    this.metaTag.twitterAuthor = this.updateForm.get('twitterAuthor').value;
    this.metaTag.twitterDescription = this.updateForm.get('twitterDescription').value;
    this.metaTag.twitterImage = this.updateForm.get('twitterImage').value;
    this.metaTag.twitterTitle = this.updateForm.get('twitterTitle').value;
    this.metaTagService.updateMetaTag(this.metaTag).pipe(take(1)).subscribe(t => {
      const message: MessageI = { content: 'Les imformations de référencement on été enregistrées', level: 'Info' };
      this.messageService.add(message);
    })
  }

  getMetaTag(): void {
    this.metaTagService.getMetaTags().pipe(take(1)).subscribe(metaTag => {
      this.metaTag = metaTag[0];
      this.updateForm.patchValue({
        description: this.metaTag.description,
        keywords: this.metaTag.keywords,
        author: this.metaTag.author,
        facebookTitle: this.metaTag.facebookTitle,
        facebookDescription: this.metaTag.facebookDescription,
        facebookImage: this.metaTag.facebookImage,
        twitterTitle: this.metaTag.twitterTitle,
        twitterDescription: this.metaTag.twitterDescription,
        twitterImage: this.metaTag.twitterImage,
        twitterAuthor: this.metaTag.twitterAuthor
      })
    })
  }

  constructor(public authenticationService: AuthentificationService, private metaTagService: MetaTagService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.expireService.check();
    this.getMetaTag();
  }

}
