import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Util } from 'src/app/environement/util';
import { BetweenTimeI } from 'src/app/interfaces/BetweenTimeI';
import { HoraireI } from 'src/app/interfaces/HoraireI';
import { ItemCarteI } from 'src/app/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
import { MessageI } from 'src/app/interfaces/MessageI';
import { StockI } from 'src/app/interfaces/StockI';
import { AlertService } from 'src/app/rootComponent/comfirm-dialog/alert.service';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { ExpireService } from 'src/app/services/expire.service';
import { HoraireService } from 'src/app/services/horaire.service';
import { ItemCarteService } from 'src/app/services/item-carte.service';
import { ItemCategorieService } from 'src/app/services/itemCategorie.service';
import { StockService } from 'src/app/services/StockService';

declare var bootstrap:any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks:StockI[]=[];
  items:ItemCarteI[]=[];
  itemCategories:ItemCategorieI[]=[];
  stockItem:StockI={item:{id:"",name:"",description:"",price:0,order:0,sourceImage:null,categorie:null,allergenes:null,tva:null,options:null,visible:false,promotions:null,stock:1},disponibility:{lundi:null,mardi:null,mercredi:null,jeudi:null,vendredi:null,samedi:null,dimanche:null,ferie:null}};
  util = new Util();
  itemSelected:boolean=false;
  horaire: HoraireI;
  addModal:any;

  addData(qty:number):void
  {
    this.stockItem.disponibility=this.horaire;
    this.stockService.addManyStock(this.stockItem,qty).pipe(take(1)).subscribe(t=>{
      this.stockItem={item:{id:"",name:"",description:"",price:0,order:0,sourceImage:null,categorie:null,allergenes:null,tva:null,options:null,visible:false,promotions:null,stock:1},disponibility:{lundi:null,mardi:null,mercredi:null,jeudi:null,vendredi:null,samedi:null,dimanche:null,ferie:null}}
      this.itemSelected=false;
      this.horaireService.getHoraires().pipe(take(1)).subscribe(horaires=>{
        this.horaire=horaires[0];
        const message:MessageI={content:'La modification a été enregistrée',level:'Info'};
        this.addModal.hide();
        this.messageService.add(message);
      })

    })
  }

  filter(categorie:ItemCategorieI): void {
    this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items => {
      if(categorie)
      {
        this.stockItem.item.categorie=categorie;
        var id=categorie.id;
        this.items=items.filter(a=>a.categorie!=null);
        this.items=this.items.filter(a=>a.categorie.id== id);
      }
    });
  }

  selectItem(choix: ItemCarteI)
  {
    this.itemSelected=true;
    this.stockItem.item=choix;
  }

  getStocks(): void{
    this.stockService.getStock().pipe(take(1)).subscribe(stocks=>{
      this.stocks=stocks;
    })
  }
  addBetween(debut, fin, day:number): void {
    if(debut.value && fin.value)
    {
      switch (day) {
        case 0:
          this.horaire.lundi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.lundi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 1:
          this.horaire.mardi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.mardi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 2:
          this.horaire.mercredi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.mercredi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 3:
          this.horaire.jeudi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.jeudi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 4:
          this.horaire.vendredi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.vendredi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 5:
          this.horaire.samedi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.samedi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 6:
          this.horaire.dimanche.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.dimanche.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
        case 7:
          this.horaire.ferie.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.horaire.lundi.sort((a,b)=>{
            if(a.debut>b.debut)
              return 1
            else if(a.debut<b.debut)
              return -1
            else
              return 0
          });
          break;
      }  
    }
    else
    {
      const message:MessageI={content:'Un élément d\'horaire doit contenir une heure de début et une heure de fin',level:'Attention'};
      this.messageService.add(message);     
    }
  }

  deleteBetween(between:BetweenTimeI,day:number):void
  {
    switch (day) {
      case 0:
        var index=this.horaire.lundi.indexOf(between);
        this.horaire.lundi.splice(index,1);
        break;
      case 1:
        var index=this.horaire.mardi.indexOf(between);
        this.horaire.mardi.splice(index,1);
        break;
      case 2:
        var index=this.horaire.mercredi.indexOf(between);
        this.horaire.mercredi.splice(index,1);
        break;
      case 3:
        var index=this.horaire.jeudi.indexOf(between);
        this.horaire.jeudi.splice(index,1);
        break;
      case 4:
        var index=this.horaire.vendredi.indexOf(between);
        this.horaire.vendredi.splice(index,1);
        break;
      case 5:
        var index=this.horaire.samedi.indexOf(between);
        this.horaire.samedi.splice(index,1);
        break;
      case 6:
        var index=this.horaire.dimanche.indexOf(between);
        this.horaire.dimanche.splice(index,1);
        break;
      case 7:
        var index=this.horaire.ferie.indexOf(between);
        this.horaire.ferie.splice(index,1);
        break;
    }
  }
  
  constructor(private horaireService:HoraireService,private itemCarteService:ItemCarteService,private itemCategorieService: ItemCategorieService,private stockService:StockService,private http: HttpClient,private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) {
    this.itemCategorieService.getCategories().pipe(take(1)).subscribe(categories=>{
      this.itemCategories=categories;
    })
    this.horaireService.getHoraires().pipe(take(1)).subscribe(horaires=>{
      this.horaire=horaires[0];
    })
   }

  ngOnInit(): void {
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'), {});
  }

}
