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
import { ExpireService } from '../expire.service';
import { TvaService } from '../list-tva/tva.service';
import { TvaI } from '../interfaces/TvaI';

@Component({
  selector: 'app-list-item-carte',
  templateUrl: './list-item-carte.component.html',
  styleUrls: ['./list-item-carte.component.css']
})

export class ListItemCarteComponent implements OnInit {
  itemCarte:ItemCarteI;
  selectedItem:ItemCarteI;
  filterCategorie:CategorieI;
  itemsCarte:ItemCarteI[];
  categories:CategorieI[];
  images:ImageI[];
  allergenes:AllergeneI[];
  allergenesAdd:AllergeneI[]=[];
  allergenesUpdate:AllergeneI[]=[];
  tvas:TvaI[]=[];
  categorieUpdate:string='';
  tvaUpdate:string='';

  selectedImage:ImageI;
  urlDownload:String="http://localhost:8080/images/download/";

  compareFn = this._compareFn.bind(this);
 
  dropC(event: CdkDragDrop<string[]>) {
    const message:MessageI={content:'Les éléments ont été triés',level:'Info'}

    moveItemInArray(this.itemsCarte, event.previousIndex, event.currentIndex);
    this.itemsCarte.forEach((item, idx) => {
      item.order = idx + 1;
      this.itemCarteService.updateItem(item).subscribe();
    });

    this.messageService.add(message);
  } 

  _compareFn(a, b) {
      try
      {
        return a.id === b.id;
      }
      catch(Err)
      {
        return 0;
      }
 }

  filter():void {
    this.itemCarteService.getItemCartes().subscribe(items=>{this.itemsCarte=items.filter(a=>a.categorie.name==this.filterCategorie.name)
      .sort((a,b)=>{
        if(a.order>b.order)
          return 1;
        else if(a.order<b.order)
          return -1;
        else
          return 0;
      });
    });

  }

  selectItem(itemCarte:ItemCarteI):void
  {
    this.selectedItem=itemCarte;
  }

  update():void {
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

  addItem(name:HTMLInputElement,description:HTMLInputElement,price:HTMLInputElement,selectedTva:HTMLSelectElement,selectedCategorie:HTMLSelectElement)
  {
    var addCategorie:CategorieI;
    var addTva:TvaI;

    for(var i=0;i<selectedCategorie.options.length;i++)
    {
      if(selectedCategorie.options[i].selected)
      {
        addCategorie=this.categories[i];
      }
    }

    for(var i=0;i<selectedTva.options.length;i++)
    {
      if(selectedTva.options[i].selected)
      {
        addTva=this.tvas[i];
      }
    }
    
    const itemAdd:ItemCarteI={
      id:'',
      name:name.value,
      description:description.value,
      price:Number(price.value),
      categorie:addCategorie,
      tva:addTva,
      allergenes:this.allergenesAdd,
      order:this.itemsCarte.length,
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

  constructor(private tvaService:TvaService,private alertService: AlertService,private categorieService:CategorieService, private imageService:ImageService,private allergeneService:AllergeneService,private itemCarteService:ItemCarteService,private messageService:MessageService, private expireService:ExpireService) { }

  onSelect(image:ImageI)
  {
    this.selectedImage=image;
    this.expireService.check;
  }

  ngOnInit(): void {

    this.categorieService.getCategories().subscribe(categories=>{this.categories=categories.sort((a,b)=>{
      if(a.order>b.order)
        return 1;
      else if(a.order<b.order)
        return -1;
      else
        return 0
    });
    });
    this.imageService.getImages().subscribe(images=>this.images=images);
    this.allergeneService.getAllergenes().subscribe(allergenes=>{
    this.allergenes=allergenes;
    });
    this.tvaService.getTvas().subscribe(tvas=>{
      this.tvas=tvas;
    })
   }

}
