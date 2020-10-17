import { Component, OnInit } from '@angular/core';
import { CategorieService } from './categorie.service'
import { categorieI} from '../interfaces/categorieI'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService} from '../message.service'
import { messageI } from '../interfaces/messageI';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})

export class ListCategorieComponent implements OnInit {
  categories: categorieI[];
  selectedCategorie: categorieI;

  onSelect(categorie:categorieI)
  {
    this.selectedCategorie=categorie;
  }
 
  add(name:String): void{
    const message:messageI={content:'La catégorie a été rajoutée',level:'Info'}
    name = name.trim();
    var order:Number = this.categories.length+1;
    if (!name) { return; }
    this.categorieService.addCategorie({ name,order } as categorieI)
      .subscribe(categorie => {
        this.categories.push(categorie);
        this.messageService.add(message);
      });    
  }

  delete(categorie:categorieI):void {
    const message:messageI={content:'L\'élément à été supprimé',level:'Attention'}

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la catégorie ?",function(){
      that.categorieService.deleteCategorie(categorie).subscribe( test=>
        {
          var index = that.categories.indexOf(categorie);
          that.categories.splice(index, 1);
          that.messageService.add(message);    
        }
        );
        that.categories.forEach((categorie, idx) => {
          categorie.order = idx + 1;
          that.categorieService.updateCategorie(categorie).subscribe();
        });
        that.selectedCategorie=null;
    },function(){

    });
  }

  update(): void {
    const message:messageI={content:'La modification a été enregistrée',level:'Info'}

    this.categorieService.updateCategorie(this.selectedCategorie)
      .subscribe(item=>this.messageService.add(message));
  }


  getCategories(): void {
    this.categorieService.getCategories().subscribe(categories => this.categories=categories.sort((a,b)=>{
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
    const message:messageI={content:'Les éléments ont été triés',level:'Info'}

    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    this.categories.forEach((categorie, idx) => {
      categorie.order = idx + 1;
      this.categorieService.updateCategorie(categorie).subscribe();
    });

    this.messageService.add(message);
  }


  constructor(private categorieService:CategorieService, private alertService: AlertService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getCategories();
  }

}
