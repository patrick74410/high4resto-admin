import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/app/environement/environement';
import { Util } from 'src/app/environement/util';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
import { MessageI } from 'src/app/interfaces/MessageI';
import { StockI } from 'src/app/interfaces/StockI';
import { OrderI } from 'src/app/interfaces/tracability/Order';
import { PreOrderI } from 'src/app/interfaces/tracability/PreOrder';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { ServeurService } from 'src/app/services/serveur.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})

export class InterfaceComponent implements OnInit {
  itemsCategory: ItemCategorieI[];
  currentCategory: ItemCategorieI;
  stocksAdd: StockI[] = [];
  preOrder: PreOrderI[] = [];
  orders: OrderI[] = [];

  currentAdd: StockI;
  table: string = "";

  urlDownload: string = environment.apiUrl + "/images/download/";

  getTable(): void {
    this.serveurService.getPreOrder(this.table).pipe(take(1)).subscribe(preOrder => {
      this.preOrder = preOrder;
    });
    this.serveurService.getOrder(this.table).pipe(take(1)).subscribe(orders => {
      this.orders = orders;
    })
  }

  cancel(): void {
    this.table = "";
    this.currentAdd = null;
  }

  goBack(preOrder: PreOrderI) {
    this.serveurService.moveBackToStock(preOrder).pipe(take(1)).subscribe(
      t => {
        this.currentAdd = t;

        this.getTable();
      }
    )
  }

  sendToCook(panierItem: PreOrderI) {
    var order: OrderI = { preOrder: panierItem, inside: "", mandatory: this.authenticationService.userName, deleveryMode: "inside", statusOfPayement: "", timeToTake: "", toTake: false };
    this.serveurService.moveToOrder(order).pipe(take(1)).subscribe(t => {
      this.getTable();
      const message: MessageI = { content: 'Item signalé', level: 'Info' };
      this.messageService.add(message);
    })
  }

  sendAllToCook():void
  {
    this.serveurService.moveManyToOrder(this.table,this.authenticationService.userName).pipe(take(1)).subscribe(t=>{
      const message: MessageI = { content: 'Items signalés', level: 'Info' };
      this.messageService.add(message);
      this.getTable();
    });
  }

  sendAllToTakeCook(category: ItemCategorieI)
  {
    this.serveurService.moveManyToTake(this.table,category.id).pipe(take(1)).subscribe(t=>{
      const message: MessageI = { content: 'Items signalés', level: 'Info' };
      this.messageService.add(message);
      this.getTable();
    });
  }

  addToPreorder(message: string): void {
    var tp: PreOrderI = { stock: this.currentAdd, messageToNext: message, orderNumber: "", idCustommer: "", destination: this.table };
    this.serveurService.moveToPreOrder(tp).pipe(take(1)).subscribe(t => {
      this.filterAdd(this.currentCategory);
    });
    this.currentAdd = null;
  }

  moveToTake(order: OrderI): void {
    this.serveurService.moveToTake(order).pipe(take(1)).subscribe(t => {
      this.serveurService.getOrder(this.table).pipe(take(1)).subscribe(orders => {
        this.orders = orders;
        const message: MessageI = { content: 'La demande d\'envoie a bien été réalisée', level: 'Info' };
        this.messageService.add(message);
      })
    })
  }

  check(idx: number, i: number, item: HTMLInputElement) {
    this.currentAdd.item.options[idx].options[i].selected = item.checked;
  }

  filterAdd(category: ItemCategorieI): void {
    this.serveurService.getStock(category).pipe(take(1)).subscribe(stockAdd => {
      this.stocksAdd = stockAdd;
    })
    this.currentCategory = category;
  }

  selectStock(stock: StockI): void {
    this.currentAdd = stock;
  }

  util = new Util();
  constructor(private messageService: MessageService, private serveurService: ServeurService, public authenticationService: AuthentificationService) {
    this.serveurService.getCategory().pipe(take(1)).subscribe(category => {
      this.itemsCategory = category;
    })
  }

  ngOnInit(): void {
  }

}
