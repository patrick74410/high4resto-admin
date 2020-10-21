import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CDK_DRAG_CONFIG, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CategorieService } from '../list-categorie/categorie.service'
import { ImageService } from '../list-image/image.service'
import { AllergeneService } from '../list-allergene/allergene.service'
import { ItemMenuService } from './item-menu.service'
import { MessageService } from '../message.service'
import { AlertService } from '../comfirm-dialog/alert.service';

import {CategorieI} from '../interfaces/categorieI'
import {ImageI} from '../interfaces/imageI'
import {AllergeneI} from '../interfaces/allergeneI'
import {ItemMenuI} from '../interfaces/itemMenuI'
import { from } from 'rxjs';
import { MessageI } from '../interfaces/messageI';

@Component({
  selector: 'app-list-item-menu',
  templateUrl: './list-item-menu.component.html',
  styleUrls: ['./list-item-menu.component.css']
})

export class ListItemMenuComponent implements OnInit {
  itemMenu:ItemMenuI;
  selectedItem:ItemMenuI;
  itemsMenu:ItemMenuI[];
  categories:CategorieI[];
  images:ImageI[];
  allergenes:AllergeneI[];
  allergenesAdd:AllergeneI[]=[];
  allergenesUpdate:AllergeneI[]=[];

  selectedImage:ImageI;
  urlDownload:String="http://localhost:8080/images/download/";

  selectItem(itemMenu:ItemMenuI):void
  {
    this.selectedItem=itemMenu;
  }

  update():void {
    this.itemMenuService.updateItem(this.selectedItem).subscribe(item=>{
      const message:MessageI={content:'L\'item a été mis à jour',level:'Info'};
      this.messageService.add(message);
    })
  }

  delete(itemMenu:ItemMenuI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'};

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'item de menu ?",function(){
      that.itemMenuService.deleteItem(itemMenu).subscribe( test=>
        {
          var index = that.itemsMenu.indexOf(itemMenu);
          that.itemsMenu.splice(index, 1);
          that.messageService.add(message);    
        }
        );
        that.selectedItem=null;
    },function(){

    });
  }

  addItem(name:HTMLInputElement,description:HTMLInputElement,price:HTMLInputElement,selectedCategorie:HTMLSelectElement,order:HTMLInputElement)
  {
    var addCategorie:CategorieI;

    for(var i=0;i<selectedCategorie.options.length;i++)
    {
      if(selectedCategorie.options[i].selected)
      {
        addCategorie=this.categories[i];
        console.log(this.categories[i]);
      }
    }

    
    const itemAdd:ItemMenuI={
      id:'',
      name:name.value,
      description:description.value,
      price:Number(price.value),
      categorie:addCategorie,
      allergenes:this.allergenesAdd,
      order:Number(order.value),
      sourceImage:this.selectedImage
    }
  
    this.itemMenuService.addItemMenu(itemAdd).subscribe(test=>{
      this.itemsMenu.push(itemAdd);
      const message:MessageI={content:'L\'item a bien été ajouté',level:'Info'};
      this.messageService.add(message);
      this.allergenes=[];
      this.allergenesAdd=[];
      this.allergeneService.getAllergenes().subscribe(allergenes=>this.allergenes=allergenes);
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor(private alertService: AlertService,private categorieService:CategorieService, private imageService:ImageService,private allergeneService:AllergeneService,private itemMenuService:ItemMenuService,private messageService:MessageService) { }

  onSelect(image:ImageI)
  {
    this.selectedImage=image;
  }

  ngOnInit(): void {
    this.itemMenuService.getItemMenus().subscribe(itemsMenu=>this.itemsMenu=itemsMenu);
    this.categorieService.getCategories().subscribe(categories=>this.categories=categories);
    this.imageService.getImages().subscribe(images=>this.images=images);
    this.allergeneService.getAllergenes().subscribe(allergenes=>{
      this.allergenes=allergenes;
    });
  }

}
