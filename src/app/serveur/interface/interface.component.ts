import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Util } from 'src/app/environement/util';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
import { StockI } from 'src/app/interfaces/StockI';
import { PreOrderI } from 'src/app/interfaces/tracability/PreOrder';
import { ServeurService } from 'src/app/services/serveur.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})

export class InterfaceComponent implements OnInit {
  itemsCategory: ItemCategorieI[];
  stocksAdd:StockI[]=[];
  preOrder: PreOrderI[]=[];
  currentAdd:StockI;
  table:number=-1;

  addToPreorder(qty: number): void {
    var tp:PreOrderI={stock:this.currentAdd,messageToNext:"",orderNumber:"",idCustommer:'table:'+this.table};
    for(let i=0;i!=qty;i++)
    {
       this.preOrder.push(tp);
    }
    this.currentAdd=null;
  }

  check(idx:number,i:number,item:HTMLInputElement)
  {
    this.currentAdd.item.options[idx].options[i].selected=item.checked;
  }

  filterAdd(category: ItemCategorieI): void {
    this.serveurService.getStock(category).pipe(take(1)).subscribe(stockAdd=>{
      this.stocksAdd= stockAdd;
    })
  }

  selectStock(stock: StockI): void {
    this.currentAdd=stock;
  }

  util= new Util();
  constructor(private serveurService:ServeurService) {
    this.serveurService.getCategory().pipe(take(1)).subscribe(category=>{
      this.itemsCategory=category;
    })
   }

  ngOnInit(): void {
  }

}
