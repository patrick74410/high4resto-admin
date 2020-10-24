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
import { MessageI } from '../interfaces/messageI';
import { ExpireService } from '../expire.service';
import { TvaService } from '../list-tva/tva.service';
import { TvaI } from '../interfaces/TvaI';
import { take } from 'rxjs/operators';
import { environment } from '../environement/environement';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var bootstrap:any;

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
  tvas:TvaI[]=[];
  categorieUpdate:string='';
  tvaUpdate:string='';

  filterForm=new FormGroup({
    filter:new FormControl('',Validators.required)
  })

  addForm=new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    tva: new FormControl('',Validators.required),
    categorie: new FormControl('',Validators.required)
  });

  updateForm=new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    tva: new FormControl('',Validators.required),
    categorie: new FormControl('',Validators.required)
  });


  updateModal:any;
  addModal:any;
  updateModalAllergene:any;
  addModalAllergene:any;
  updateImageModal:any;
  addImageModal:any;


  selectedImage:ImageI;
  urlDownload:String=environment.apiUrl+"/images/download/";

  compareFn = this._compareFn.bind(this);
 
  updateDataForm(selectedItem:ItemCarteI):void{
    this.updateForm.patchValue({
      name:selectedItem.name,
      description:selectedItem.description,
      price:selectedItem.price,
      tva:selectedItem.tva,
      categorie:selectedItem.categorie
    });
    this.updateModal.show();
    this.selectedItem=selectedItem;
  }

  addSelectImage():void{
    this.addModal.hide();
    this.addImageModal.show();
  }

  addSelectAllergene():void{
    this.addModal.hide();
    this.addModalAllergene.show();
  }
  
  updateSelectImage():void{
    this.updateModal.hide();
    this.updateImageModal.show();
  }

  updateSelectAllergene():void{
    this.updateModal.hide();
    this.updateModalAllergene.show();
  }

  dropC(event: CdkDragDrop<string[]>) {
    const message:MessageI={content:'Les éléments ont été triés',level:'Info'}

    moveItemInArray(this.itemsCarte, event.previousIndex, event.currentIndex);
    this.itemsCarte.forEach((item, idx) => {
      item.order = idx + 1;
      this.itemCarteService.updateItem(item).pipe(take(1)).subscribe();
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
    this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items=>{this.itemsCarte=items.filter(a=>a.categorie.name==(this.filterForm.get("filter").value as CategorieI).name)
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

  onUpdate():void {
    this.selectedItem.name=this.updateForm.get("name").value;
    this.selectedItem.description=this.updateForm.get("description").value;
    this.selectedItem.price=this.updateForm.get("price").value;
    this.selectedItem.tva=this.updateForm.get("tva").value;
    this.selectedItem.categorie=this.updateForm.get("categorie").value;
    this.itemCarteService.updateItem(this.selectedItem).pipe(take(1)).subscribe(item=>{
      const message:MessageI={content:'L\'item a été mis à jour',level:'Info'};
      this.updateModal.hide()
      this.messageService.add(message);
    })
  }

  delete(itemCarte:ItemCarteI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'};

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'item de la carte?",function(){
      that.itemCarteService.deleteItem(itemCarte).pipe(take(1)).subscribe( test=>
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

  addData()
  {
    const itemAdd:ItemCarteI={
      id:'',
      name:this.addForm.get("name").value,
      description:this.addForm.get("description").value,
      price:this.addForm.get("price").value,
      categorie:this.addForm.get("categorie").value,
      tva:this.addForm.get("tva").value,
      allergenes:this.allergenesAdd,
      order:this.itemsCarte.length,
      sourceImage:this.selectedImage
    }
  
    this.itemCarteService.addItemCarte(itemAdd).pipe(take(1)).subscribe(test=>{
      this.itemsCarte.push(itemAdd);
      const message:MessageI={content:'L\'item a bien été ajouté à la carte',level:'Info'};
      this.messageService.add(message);
      this.allergenes=[];
      this.allergenesAdd=[];
      this.addForm.reset();
      this.addModal.hide();
    });

    this.allergeneService.getAllergenes().pipe(take(1)).subscribe(allergenes=>this.allergenes=allergenes);

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

    this.categorieService.getCategories().pipe(take(1)).subscribe(categories=>{this.categories=categories.sort((a,b)=>{
      if(a.order>b.order)
        return 1;
      else if(a.order<b.order)
        return -1;
      else
        return 0
    });
    });
    this.imageService.getImages().pipe(take(1)).subscribe(images=>this.images=images);
    this.allergeneService.getAllergenes().pipe(take(1)).subscribe(allergenes=>{
    this.allergenes=allergenes;
    });
    this.tvaService.getTvas().pipe(take(1)).subscribe(tvas=>{
      this.tvas=tvas;
    });
    this.updateModal=new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.addModal=new bootstrap.Modal(document.getElementById('addModal'), {});
    this.updateModalAllergene=new bootstrap.Modal(document.getElementById('updateModalAllergene'), {});
    this.addModalAllergene=new bootstrap.Modal(document.getElementById('addModalAllergene'), {});
    this.updateImageModal=new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    this.addImageModal=new bootstrap.Modal(document.getElementById('addImageModal'), {});
  
   }

}
