import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../list-categorie/categorie.service'
import { ImageService } from '../list-image/image.service'
import { AllergeneService } from '../list-allergene/allergene.service'
import { ItemMenuService } from './item-menu.service'
import { MessageService } from '../message.service'
import { AlertService } from '../comfirm-dialog/alert.service';

import {categorieI} from '../interfaces/categorieI'
import {imageI} from '../interfaces/imageI'
import {allergeneI} from '../interfaces/allergeneI'
import {itemMenuI} from '../interfaces/itemMenuI'
import { from } from 'rxjs';
import { messageI } from '../interfaces/messageI';

@Component({
  selector: 'app-list-item-menu',
  templateUrl: './list-item-menu.component.html',
  styleUrls: ['./list-item-menu.component.css']
})

export class ListItemMenuComponent implements OnInit {
  itemMenu:itemMenuI;
  selectedItem:itemMenuI;
  itemsMenu:itemMenuI[];
  categories:categorieI[];
  images:imageI[];
  allergenes:allergeneI[];
  image:imageI;
  selectedImage:imageI;
  urlDownload:String="http://localhost:8080/images/download/";

  selectItem(itemMenu:itemMenuI):void
  {
    this.selectedItem=itemMenu;
  }

  delete(itemMenu:itemMenuI):void {
    const message:messageI={content:'L\'élément à été supprimé',level:'Attention'}

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

  addItem(name:HTMLInputElement,description:HTMLInputElement,price:HTMLInputElement,selectedCategorie:HTMLSelectElement,selectedAllergene:HTMLSelectElement,order:HTMLInputElement)
  {
    var addAllergenes:allergeneI[]=[];
    var addCategorie:categorieI;

    for(var i=0;i<selectedCategorie.options.length;i++)
    {
      if(selectedCategorie.options[i].selected)
      {
        addCategorie=this.categories[i];
        console.log(this.categories[i]);
      }
    }

    console.log("Allergènes:")
    
    for(var i=0;i<selectedAllergene.options.length;i++)
    {
      if(selectedAllergene.options[i].selected)
      {
        addAllergenes.push(this.allergenes[i]);
        console.log(this.allergenes[i])
      }
    }

    const itemAdd:itemMenuI={
      id:'',
      name:name.value,
      description:description.value,
      price:Number(price.value),
      categorie:addCategorie,
      allergenes:addAllergenes,
      order:Number(order.value),
      sourceImage:this.selectedImage
    }
  
    this.itemMenuService.addItemMenu(itemAdd).subscribe(test=>{
      this.itemsMenu.push(itemAdd);
      const message:messageI={content:'L\'item a bien été ajouté',level:'Info'};
      this.messageService.add(message);
    });

  }

  constructor(private alertService: AlertService,private categorieService:CategorieService, private imageService:ImageService,private allergeneService:AllergeneService,private itemMenuService:ItemMenuService,private messageService:MessageService) { }

  onSelect(image:imageI)
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
