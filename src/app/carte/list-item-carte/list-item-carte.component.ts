import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CDK_DRAG_CONFIG, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CategorieService } from '../../services/categorie.service'
import { ImageService } from '../../services/image.service'
import { AllergeneService } from '../../services/allergene.service'
import { ItemCarteService } from '../../services/item-carte.service'
import { MessageService } from '../../rootComponent/messages/message.service'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import {PromotionService} from '../../services/promotion.service'
import { TvaService } from '../../services/tva.service';
import { ExpireService } from '../../services/expire.service';
import { OptionsItemService } from '../../services/options-service'

import {CategorieI} from '../../interfaces/categorieI'
import {ImageI} from '../../interfaces/imageI'
import {AllergeneI} from '../../interfaces/allergeneI'
import {ItemCarteI} from '../../interfaces/itemCarteI'
import { MessageI } from '../../interfaces/messageI';
import { OptionsItemI } from '../../interfaces/OptionsItem';
import { PromotionI } from '../../interfaces/promotionI';
import { TvaI } from '../../interfaces/TvaI';

import { take } from 'rxjs/operators';
import { environment } from '../../environement/environement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Util } from '../../environement/util';

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
  tvas:TvaI[]=[];
  categorieUpdate:string='';
  tvaUpdate:string='';
  options:OptionsItemI[]=[];
  optionsSelected:OptionsItemI[]=[];
  promotions:PromotionI[]=[];
  promotionsSelected:PromotionI[]=[];

  util=new Util();

  filterForm=new FormGroup({
    filter:new FormControl('',Validators.required)
  })

  updateItemImage(image:ImageI)
  {
    this.selectedItem.sourceImage=image;
  }

  addItemImage(image:ImageI)
  {
    this.selectedImage=image;
  }

  addForm=new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    tva: new FormControl('',Validators.required),
    categorie: new FormControl('',Validators.required),
    visible: new FormControl(''),

  });

  updateForm=new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    tva: new FormControl('',Validators.required),
    categorie: new FormControl('',Validators.required),
    visible: new FormControl(''),

  });


  urlDownload:String=environment.apiUrl+"/images/download/";
  selectedImage:ImageI;

  compareFn = this._compareFn.bind(this);
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

  updateDataForm(selectedItem:ItemCarteI):void{
    this.updateForm.patchValue({
      name:selectedItem.name,
      description:selectedItem.description,
      price:selectedItem.price,
      tva:selectedItem.tva,
      categorie:selectedItem.categorie,
    });
    var updateModal=new bootstrap.Modal(document.getElementById('updateModal'), {});
    updateModal.show();
    this.selectedItem=selectedItem;
  }

  addSelectedPromotions():void{
    this.promotionService.getPromotions().pipe(take(1)).subscribe(promotions=>{
      this.promotions=promotions;
      var addPromotionModal=new bootstrap.Modal(document.getElementById('addModalPromotion'),{});
      addPromotionModal.show();
    })
  }

  addSelectedOptions():void{
    this.optionService.getOptionsItems().pipe(take(1)).subscribe(options=>{
      this.options=options;
      var addOptionModal=new bootstrap.Modal(document.getElementById('addModalOptions'),{});
      addOptionModal.show();
      })

  }

  addSelectImage():void{
    var addImageModal=new bootstrap.Modal(document.getElementById('addImageModal'), {});
    addImageModal.show();
  }

  addSelectAllergene():void{
    this.allergeneService.getAllergenes().pipe(take(1)).subscribe(allergenes=>{
      this.allergenes=allergenes;
      var addModalAllergene=new bootstrap.Modal(document.getElementById('addModalAllergene'), {});
      addModalAllergene.show();
        });
  }
  
  updateSelectImage():void{
    var updateImageModal=new bootstrap.Modal(document.getElementById('updateImageModal'), {});
    updateImageModal.show();

  }

  updateSelectedOptions():void{
    var updateModalOption=new bootstrap.Modal(document.getElementById('updateModalOptions'),{});
    updateModalOption.show();

    this.optionService.getOptionsItems().pipe(take(1)).subscribe(options=>{
       this.options=options.filter((item)=>{
        return !this.selectedItem.options.some(e=>e.id==item.id);
      });
    })
  }

  updateSelectedPromotions():void{
    this.promotionService.getPromotions().pipe(take(1)).subscribe(promotion => {
      this.promotions=promotion.filter((item)=>{
        return !this.selectedItem.promotions.some(e=>e.id==item.id)
      });
      var updatePromotionModal=new bootstrap.Modal(document.getElementById('updateModalPromotion'),{});
      updatePromotionModal.show();
    })
  }

  updateSelectAllergene():void{
    this.allergeneService.getAllergenes().pipe(take(1)).subscribe(allergenes=>{
      this.allergenes=allergenes.filter((item)=>{
        return !this.selectedItem.allergenes.some(e=>e.id==item.id);
      });
       var updateModalAllergene=new bootstrap.Modal(document.getElementById('updateModalAllergene'), {});
        updateModalAllergene.show();  
      });

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
      document.getElementById('closeUpdateModal').click();
      const message:MessageI={content:'L\'item a été mis à jour',level:'Info'};
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
    if(this.addForm.valid)
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
        sourceImage:this.selectedImage,
        options:this.optionsSelected,
        visible:this.addForm.get("visible").value,
        promotions:this.promotionsSelected
      }
    
      this.itemCarteService.addItemCarte(itemAdd).pipe(take(1)).subscribe(test=>{
        this.itemsCarte.push(itemAdd);
        const message:MessageI={content:'L\'item a bien été ajouté à la carte',level:'Info'};
        this.messageService.add(message);
        this.allergenes=[];
        this.allergenesAdd=[];
        this.addForm.reset();
        document.getElementById('closeAddModal').click();
      });  
    }
    else
    {
      const message:MessageI={content:'L\'item doit contenir un nom, une description, un prix, un choix de TVA et une catégorie',level:'Attention'};
      this.messageService.add(message);
    }

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

  constructor(private promotionService:PromotionService ,private optionService:OptionsItemService,private tvaService:TvaService,private alertService: AlertService,private categorieService:CategorieService, private imageService:ImageService,private allergeneService:AllergeneService,private itemCarteService:ItemCarteService,private messageService:MessageService, private expireService:ExpireService) { }

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
    this.promotionService.getPromotions().pipe(take(1)).subscribe(promotions=>this.promotions=promotions);
    this.tvaService.getTvas().pipe(take(1)).subscribe(tvas=>{
      this.tvas=tvas;
    });


  }

}
