import { Component, OnInit } from '@angular/core';
import { CategorieService } from './categorie.service'
import { CategorieI} from '../interfaces/categorieI'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService} from '../message.service'
import { MessageI } from '../interfaces/messageI';
import { ExpireService } from '../expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var bootstrap:any;

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})

export class ListCategorieComponent implements OnInit {
  categories: CategorieI[];
  selectedCategorie: CategorieI;

  addForm= new FormGroup(
    {name:new FormControl('',Validators.required)}
  )

  updateForm = new FormGroup({
    name:new FormControl('',Validators.required)
  })

  updateModal:any;
  addModal:any;


  addData(): void{
    const message:MessageI={content:'La catégorie a été rajoutée',level:'Info'}
    var name = this.addForm.get("name").value.trim();
    var order:Number = this.categories.length+1;
    if (!name) { return; }
    this.categorieService.addCategorie({ name,order } as CategorieI).pipe(take(1))
      .subscribe(categorie => {
        this.categories.push(categorie);
        this.messageService.add(message);
        this.addForm.reset();
        this.addModal.hide();
      });    
  }

  updateDataForm(selectedCategorie:CategorieI):void{
    this.updateForm.patchValue({name:selectedCategorie.name});
    this.updateModal.show();
    this.selectedCategorie=selectedCategorie;
  }

  onUpdate(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.selectedCategorie.name=this.updateForm.get("name").value;
    this.categorieService.updateCategorie(this.selectedCategorie)
      .pipe(take(1)).subscribe(item=>{this.messageService.add(message),this.updateModal.hide()});
  }
  
  delete(categorie:CategorieI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la catégorie ?",function(){
      that.categorieService.deleteCategorie(categorie).pipe(take(1)).subscribe( test=>
        {
          var index = that.categories.indexOf(categorie);
          that.categories.splice(index, 1);
          that.messageService.add(message);    
        });
        
        that.categories.forEach((categorie, idx) => {
          categorie.order = idx + 1;
          that.categorieService.updateCategorie(categorie).pipe(take(1)).subscribe();
        });
        that.selectedCategorie=null;
    },function(){

    });
  }

  getCategories(): void {
    this.categorieService.getCategories().pipe(take(1)).subscribe(categories => this.categories=categories.sort((a,b)=>{
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

    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    this.categories.forEach((categorie, idx) => {
      categorie.order = idx + 1;
      this.categorieService.updateCategorie(categorie).pipe(take(1)).subscribe();
    });

    this.messageService.add(message);
  }


  constructor(private categorieService:CategorieService, private alertService: AlertService,private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getCategories();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateCategorie'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addCategorie'), {});

  }

}
