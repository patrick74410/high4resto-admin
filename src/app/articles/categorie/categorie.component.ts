import { Component, OnInit } from '@angular/core';
import { ArticleCategorieService } from '../../services/categorieArticle.service'
import { ArticleCategorieI} from '../../interfaces/ArticleCategorieI'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService} from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/messageI';
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Util } from '../../environement/util';
import { ImageI } from '../../interfaces/imageI';
import { environment } from '../../environement/environement';

declare var bootstrap:any;

@Component({
  selector: 'app-list-article-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  articleCategories: ArticleCategorieI[];
  selectedArticleCategorie: ArticleCategorieI;
  addArticleCategorie:ArticleCategorieI={name:"",description:""};
  util=new Util();
  urlDownload:String=environment.apiUrl+"/images/download/";

  addForm= new FormGroup(
    {
      name:new FormControl('',Validators.required),
      description:new FormControl(''),
    }
  )

  updateForm = new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl(''),
  })


  updateImage(image:ImageI)
  {
    this.selectedArticleCategorie.image=image;
  }
  updateIcon(image:ImageI)
  {
    this.selectedArticleCategorie.iconImage=image;
  }
  addImage(image:ImageI)
  {
    this.addArticleCategorie.image=image;
  }
  addIcon(image:ImageI)
  {
    this.addArticleCategorie.iconImage=image;
  }

  showUpdateImage()
  {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateImageModal'),{});
    updateImageModal.show();
  }
  showUpdateIcon()
  {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateIconModal'),{});
    updateImageModal.show();
  }
  showAddImage()
  {
    var updateImageModal = new bootstrap.Modal(document.getElementById('addImageModal'),{});
    updateImageModal.show();
  }
  showAddIcon()
  {
    var updateImageModal = new bootstrap.Modal(document.getElementById('addIconModal'),{});
    updateImageModal.show();
  }
  
  updateModal:any;
  addModal:any;



  addData(): void{
    console.log("ok");
    const message:MessageI={content:'La catégorie a été rajoutée',level:'Info'}
    this.addArticleCategorie.description=this.addForm.get("description").value;
    this.addArticleCategorie.name=this.addForm.get("name").value.trim();
    this.addArticleCategorie.order=this.articleCategories.length+1;
    if (!this.addArticleCategorie.name) { return; }
    this.articleCategorieService.addArticleCategorie(this.addArticleCategorie).pipe(take(1))
      .subscribe(articleCategorie => {
        this.articleCategories.push(articleCategorie);
        this.messageService.add(message);
        this.addForm.reset();
        document.getElementById("addClose").click();
      });    
  }

  updateDataForm(selectedArticleCategorie:ArticleCategorieI):void{
    this.updateForm.patchValue({name:selectedArticleCategorie.name,description:selectedArticleCategorie.description});
    this.updateModal.show();
    this.selectedArticleCategorie=selectedArticleCategorie;
  }

  onUpdate(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.selectedArticleCategorie.name=this.updateForm.get("name").value;
    this.selectedArticleCategorie.description=this.updateForm.get("description").value;

    this.articleCategorieService.updateArticleCategorie(this.selectedArticleCategorie)
      .pipe(take(1)).subscribe(item=>{this.messageService.add(message),document.getElementById("updateClose").click();});
  }
  
  delete(articleCategorie:ArticleCategorieI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la catégorie ?",function(){
      that.articleCategorieService.deleteArticleCategorie(articleCategorie).pipe(take(1)).subscribe( test=>
        {
          var index = that.articleCategories.indexOf(articleCategorie);
          that.articleCategories.splice(index, 1);
          that.messageService.add(message);    
        });
        
        that.articleCategories.forEach((articleCategorie, idx) => {
          articleCategorie.order = idx + 1;
          that.articleCategorieService.updateArticleCategorie(articleCategorie).pipe(take(1)).subscribe();
        });
        that.selectedArticleCategorie=null;
    },function(){

    });
  }

  getArticleCategories(): void {
    this.articleCategorieService.getArticleCategories().pipe(take(1)).subscribe(articleCategories => this.articleCategories=articleCategories.sort((a,b)=>{
      if(a.order>b.order)
      {
        return 1;
      }
      if(a.order<b.order)
      {
        return -1;
      }
      return 0;
    }));
  }

  drop(event: CdkDragDrop<string[]>) {
    const message:MessageI={content:'Les éléments ont été triés',level:'Info'}

    moveItemInArray(this.articleCategories, event.previousIndex, event.currentIndex);
    this.articleCategories.forEach((articleCategorie, idx) => {
      articleCategorie.order = idx + 1;
      this.articleCategorieService.updateArticleCategorie(articleCategorie).pipe(take(1)).subscribe();
    });

    this.messageService.add(message);
  }


  constructor(private articleCategorieService:ArticleCategorieService, private alertService: AlertService,private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getArticleCategories();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateArticleCategorie'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addArticleCategorie'), {});
  }}
