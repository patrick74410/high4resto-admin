import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CDK_DRAG_CONFIG, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CategorieService } from '../list-categorie/categorie.service'
import { ImageService } from '../list-image/image.service'
import { AllergeneService } from '../list-allergene/allergene.service'
import { ItemCarteService } from './item-carte.service'
import { MessageService } from '../message.service'
import { AlertService } from '../comfirm-dialog/alert.service';

import {CategorieI} from '../interfaces/categorieI'
import {ImageI} from '../interfaces/imageI'
import {AllergeneI} from '../interfaces/allergeneI'
import {ItemCarteI} from '../interfaces/itemCarteI'
import { from } from 'rxjs';
import { MessageI } from '../interfaces/messageI';

@Component({
  selector: 'app-list-item-carte',
  templateUrl: './list-item-carte.component.html',
  styleUrls: ['./list-item-carte.component.css']
})

export class ListItemCarteComponent implements OnInit {
  itemCarte:ItemCarteI;
  selectedItem:ItemCarteI;
  itemsCarte:ItemCarteI[];
  categories:CategorieI[];
  images:ImageI[];
  allergenes:AllergeneI[];
  allergenesAdd:AllergeneI[]=[];
  allergenesUpdate:AllergeneI[]=[];

  selectedImage:ImageI;
  urlDownload:String="http://localhost:8080/images/download/";

  selectItem(itemCarte:ItemCarteI):void
  {
    this.selectedItem=itemCarte;
  }

  update():void {
    this.selectedItem.categorie.name=this.categories[Number(this.selectedItem.categorie.name)].name;

    this.itemCarteService.updateItem(this.selectedItem).subscribe(item=>{
      const message:MessageI={content:'L\'item a été mis à jour',level:'Info'};
      this.messageService.add(message);
    })
  }

  delete(itemCarte:ItemCarteI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'};

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'item de la carte?",function(){
      that.itemCarteService.deleteItem(itemCarte).subscribe( test=>
        {
          var index = that.itemsCarte.indexOf(itemCarte);
          that.itemsCarte.splice(index, 1);
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

    
    const itemAdd:ItemCarteI={
      id:'',
      name:name.value,
      description:description.value,
      price:Number(price.value),
      categorie:addCategorie,
      allergenes:this.allergenesAdd,
      order:Number(order.value),
      sourceImage:this.selectedImage
    }
  
    this.itemCarteService.addItemCarte(itemAdd).subscribe(test=>{
      this.itemsCarte.push(itemAdd);
      const message:MessageI={content:'L\'item a bien été ajouté à la carte',level:'Info'};
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

  constructor(private alertService: AlertService,private categorieService:CategorieService, private imageService:ImageService,private allergeneService:AllergeneService,private itemCarteService:ItemCarteService,private messageService:MessageService) { }

  onSelect(image:ImageI)
  {
    this.selectedImage=image;
  }

  ngOnInit(): void {
    this.itemCarteService.getItemCartes().subscribe(itemsCarte=>this.itemsCarte=itemsCarte);
    this.categorieService.getCategories().subscribe(categories=>this.categories=categories);
    this.imageService.getImages().subscribe(images=>this.images=images);
    this.allergeneService.getAllergenes().subscribe(allergenes=>{
    this.allergenes=allergenes;
    });
  }

}
