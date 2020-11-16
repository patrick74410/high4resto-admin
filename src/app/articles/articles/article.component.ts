import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Util } from '../../environement/util';
import { environment } from '../../environement/environement';
import { ImageService } from '../../services/image.service'
import { ArticleCategorieService } from '../../services/categorieArticle.service'
import { ArticleCategorieI } from '../../interfaces/ArticleCategorieI';
import { ImageI } from '../../interfaces/ImageI';
import { MessageI } from '../../interfaces/MessageI';
import { ArticleI } from '../../interfaces/ArticleI'

declare var bootstrap: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articleCategories: ArticleCategorieI[];
  articles: ArticleI[];
  selectedArticle: ArticleI;
  addArticle: ArticleI = { title: "", content: "", date: "", author: "",categorie:{name:"Aucune categorie",description:""} } as ArticleI;
  util = new Util();
  urlDownload: String = environment.apiUrl + "/images/download/";

  updateModal: any;
  addModal: any;
  image_list: TinyImage[] = [];

  addImage(image: ImageI) {
    this.addArticle.image = image;
  }

  updateImage(image: ImageI) {
    this.selectedArticle.image = image;
  }

  filterForm = new FormGroup({
    filter: new FormControl('', Validators.required)
  })

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
    this.articleService.getArticles().pipe(take(1)).subscribe(items => {

      if((this.filterForm.get("filter").value as ArticleCategorieI))
      {
        var id=((this.filterForm.get("filter").value as ArticleCategorieI).id);
        this.articles=items.filter(a=>a.categorie!=null);
        this.articles=this.articles.filter(a=>a.categorie.id== id);
      }
      else
      {
        this.articles=items.filter(a=>a.categorie==null);

      }
    });
  }

  showAddImage(): void {
    var updateImageModal = new bootstrap.Modal(document.getElementById('addImageModal'), {});
    updateImageModal.show();
  }

  showUpdateImage(): void {
    var updateImageModal = new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    updateImageModal.show();
  }

  addForm = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      resume: new FormControl(''),
      content: new FormControl('',Validators.required),
      author: new FormControl(''),
      onTop: new FormControl(''),
      visible: new FormControl(''),
      categorie: new FormControl('',Validators.required)
    }
  )

  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    resume: new FormControl(''),
    content: new FormControl('',Validators.required),
    author: new FormControl(''),
    onTop: new FormControl(''),
    visible: new FormControl(''),
    categorie: new FormControl('',Validators.required)
  })

  addData(): void {
    if(this.addForm.valid)
    {
      this.addArticle.title=this.addForm.get("title").value;
      this.addArticle.resume=this.addForm.get("resume").value;
      this.addArticle.categorie = (this.addForm.get("categorie").value) as ArticleCategorieI;
      this.addArticle.author = this.addForm.get("author").value;
      this.addArticle.content = this.addForm.get("content").value;
      this.addArticle.date = new Date().toDateString();
      this.addArticle.onTop = this.addForm.get("onTop").value;
      this.addArticle.visible = this.addForm.get("visible").value;
      this.articleService.addArticle(this.addArticle).pipe(take(1)).subscribe(item => {
        const message: MessageI = { content: 'Article enregistré', level: 'Info' };
        this.messageService.add(message); this.addModal.hide();
        this.articleService.resetList();
        if((this.filterForm.get("filter").value as ArticleCategorieI)==item.categorie)
          this.articles.push(item);
      });
      document.getElementById("closeAddModal").click();
      this.addForm.reset();
    }
    else{
      const message:MessageI={content:'Le formulaire n\'est pas complet il faut le titre, un contenu, une catégorie)',level:'Attention'};
      this.messageService.add(message);
    }

  }

  delete(article:ArticleI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'};

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'article",function(){
      that.articleService.deleteArticle(article).pipe(take(1)).subscribe( test=>
        {
          var index = that.articles.indexOf(article);
          that.articles.splice(index, 1);
          that.messageService.add(message);    
        }
        );
        that.selectedArticle=null;
    },function(){

    });
  }

  updateData():void{
    this.selectedArticle.author=this.updateForm.get("author").value;
    this.selectedArticle.categorie=this.updateForm.get("categorie").value;
    this.selectedArticle.content=this.updateForm.get("content").value;
    this.selectedArticle.onTop=this.updateForm.get("onTop").value;
    this.selectedArticle.resume=this.updateForm.get("resume").value;
    this.selectedArticle.title=this.updateForm.get("title").value;
    this.selectedArticle.visible=this.updateForm.get("visible").value;
    this.articleService.updateArticle(this.selectedArticle).pipe(take(1)).subscribe(item=>{
      document.getElementById("closeUpdateModal").click();
      const message:MessageI={content:'L\'article a été mis à jour',level:'Info'};
      this.messageService.add(message);
    })
  }

  updateDataForm(selectedArticle:ArticleI):void
  {
    this.selectedArticle=selectedArticle;
    this.updateForm.patchValue({
      title: selectedArticle.title,
      resume:selectedArticle.resume,
      content:selectedArticle.content,
      author:selectedArticle.author,
      onTop:selectedArticle.onTop,
      visible:selectedArticle.visible,
      categorie:selectedArticle.categorie,
    })
    this.updateModal.show();
  }

  constructor(private articleCategorieService: ArticleCategorieService, private imageService: ImageService, private articleService: ArticleService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.expireService.check();
    this.articleCategorieService.getArticleCategories().pipe(take(1)).subscribe(categorie => {
      this.articleCategories = categorie.sort((a, b) => {
        if (a.order > b.order)
          return 1;
        else if (a.order < b.order)
          return -1;
        else
          return 0;
      });
    })
    this.updateModal = new bootstrap.Modal(document.getElementById('updateArticle'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addArticle'), {});
    this.imageService.getImages().pipe(take(1)).subscribe(images => {
      for (let image of images) {
        this.image_list.push({ title: image.fileName, value: this.urlDownload + image.gridId });
      }
    })
  }
}

export interface TinyImage {
  title: string,
  value: string
}
