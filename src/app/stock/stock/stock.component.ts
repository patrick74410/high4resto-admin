import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import { take } from 'rxjs/operators';
import { Util } from 'src/app/environement/util';
import { AllergeneI } from 'src/app/interfaces/AllergeneI';
import { HoraireI } from 'src/app/interfaces/HoraireI';
import { ImageI } from 'src/app/interfaces/ImageI';
import { ItemCarteI } from 'src/app/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
import { MessageI } from 'src/app/interfaces/MessageI';
import { OptionsItemI } from 'src/app/interfaces/OptionsItem';
import { PromotionI } from 'src/app/interfaces/PromotionI';
import { StockI } from 'src/app/interfaces/StockI';
import { DeleveryI } from 'src/app/interfaces/tracability/Delevery';
import { OrderI } from 'src/app/interfaces/tracability/Order';
import { PreOrderI } from 'src/app/interfaces/tracability/PreOrder';
import { PrepareI } from 'src/app/interfaces/tracability/Prepare';
import { ToDeliveryI } from 'src/app/interfaces/tracability/ToDelivery';
import { ToPrepareI } from 'src/app/interfaces/tracability/ToPrepare';
import { TrashI } from 'src/app/interfaces/tracability/Trash';
import { TvaI } from 'src/app/interfaces/TvaI';
import { AlertService } from 'src/app/rootComponent/comfirm-dialog/alert.service';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { ExpireService } from 'src/app/services/expire.service';
import { ItemCarteService } from 'src/app/services/item-carte.service';
import { ItemCategorieService } from 'src/app/services/itemCategorie.service';
import { StockService } from 'src/app/services/StockService';
import { TrashService } from 'src/app/services/trashService';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: StockI[] = [];
  grouppedStock: StockI[] = [];
  items: ItemCarteI[] = [];
  itemCategories: ItemCategorieI[] = [];
  stockItem: StockI = { item: { id: "", name: "", remarque: "", description: "", price: 0, order: 0, sourceImage: null, categorie: null, allergenes: null, tva: null, options: null, visible: false, promotions: null, stock: 1 } };
  util = new Util();
  itemSelected: boolean = false;
  horaire: HoraireI;
  addModal: any;
  categorie: ItemCategorieI;
  columnsToDisplay = ['select', 'NAME', 'DATE', 'USERNAME'];
  columnsGrouppedToDisplay = ['NAME', 'CATEGORY', 'QUANTITY'];
  dataSource = new MatTableDataSource<StockI>();
  dataGrouppedSource = new MatTableDataSource<StockI>();

  selection = new SelectionModel<StockI>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  delete(message: string): void {
    this.selection.selected
    for (let stock of this.selection.selected) {
      var preOrder: PreOrderI = { stock: stock, inside: "", idCustommer: "", orderNumber: "", messageToNext: "", destination: "" };
      var order: OrderI = { preOrder: preOrder, inside: "", mandatory: "", deleveryMode: "", statusOfPayement: "", timeToTake: "", toTake: false };
      var toPrepare: ToPrepareI = { order: order, inside: "", executor: "", messageToNext: "" }
      var prepare: PrepareI = { toPrepare: toPrepare, inside: "" };
      var toDelivery: ToDeliveryI = { prepare: prepare, inside: "", deleveryPerson: "", messageToNext: "" }
      var delevery: DeleveryI = { toDelivery: toDelivery, inside: "" };
      var trash: TrashI = { delevery: delevery, inside: "", causeMessage: message }
      this.trashService.addTrash(trash).pipe(take(1)).subscribe(f => {
        this.stockService.deleteStock(stock).pipe(take(1)).subscribe(t => {
          const message: MessageI = { content: 'Les items ont été supprimés', level: 'Info' };
          this.messageService.add(message);
          this.filterUnique(this.categorie);
          this.getGroupped();
        })
      });

    }
  }

  getGroupped(): void {
    this.stockService.getGrouppedStock().pipe(take(1)).subscribe(stocks => {
      this.grouppedStock = stocks;
      this.dataGrouppedSource = new MatTableDataSource<StockI>(this.grouppedStock);

    })
  }

  addData(qty: number): void {
    this.stockService.addManyStock(this.stockItem, qty, this.authenticationService.userName).pipe(take(1)).subscribe(t => {
      this.stockItem = { item: { id: "", remarque: "", name: "", description: "", price: 0, order: 0, sourceImage: null, categorie: null, allergenes: null, tva: null, options: null, visible: false, promotions: null, stock: 1 } }
      this.itemSelected = false;
      const message: MessageI = { content: 'Les items ont été ajoutés', level: 'Info' };
      this.messageService.add(message);
      this.filterUnique(this.categorie);
      this.getGroupped();
    })
  }

  updateData(qty: number): void {
    this.stockService.updateQty(this.authenticationService.userName(), this.stockItem.item.id, qty).pipe(take(1)).subscribe(t => {
      this.stockItem = { item: { id: "", name: "", remarque: "", description: "", price: 0, order: 0, sourceImage: null, categorie: null, allergenes: null, tva: null, options: null, visible: false, promotions: null, stock: 1 } }
      this.itemSelected = false;
      const message: MessageI = { content: 'Les quantités de l\'item ont été mise à jour', level: 'Info' };
      this.messageService.add(message);
      this.filterUnique(this.categorie);
      this.getGroupped();
    });
  }

  filterAdd(categorie: ItemCategorieI): void {
    this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items => {
      if (categorie) {
        this.stockItem.item.categorie = categorie;
        var id = categorie.id;
        this.items = items.filter(a => a.categorie != null);
        this.items = this.items.filter(a => a.categorie.id == id);
      }
    });
  }

  filterUnique(categorie: ItemCategorieI): void {
    this.categorie = categorie;
    this.stockService.getStock().pipe(take(1)).subscribe(stocks => {
      this.stocks = stocks.filter(stock => {
        if (stock.item && categorie)
          return stock.item.categorie.id == categorie.id;
      });
      this.dataSource = new MatTableDataSource<StockI>(this.stocks);
      this.dataSource.paginator = this.paginator;
    });
  }

  filterEntity: StockI;
  filterGroupedEntity: StockI;
  filterType: MatTableFilter;

  selectItem(choix: ItemCarteI) {
    this.itemSelected = true;
    this.stockItem.item = choix;
  }

  getStocks(): void {
    this.stockService.getStock().pipe(take(1)).subscribe(stocks => {
      this.stocks = stocks;
    })
  }

  constructor(private authenticationService: AuthentificationService, private trashService: TrashService, private itemCarteService: ItemCarteService, private itemCategorieService: ItemCategorieService, private stockService: StockService, private http: HttpClient, private messageService: MessageService, private expireService: ExpireService) {
    this.itemCategorieService.getCategories().pipe(take(1)).subscribe(categories => {
      this.itemCategories = categories;
    })

  }

  ngOnInit(): void {
    this.expireService.check();
    this.filterEntity = new Stock();
    this.filterEntity.item = new Item();
    this.filterGroupedEntity = new Stock();
    this.filterGroupedEntity.item = new Item();
    this.filterGroupedEntity.item.categorie = new Categorie();
    this.filterType = MatTableFilter.ANYWHERE;
    this.getGroupped();
  }

}
export class Stock implements StockI {
  id?: string;
  item: ItemCarteI;
  disponibility: HoraireI;
  inside?: string;
  username?: string;

}

export class Item implements ItemCarteI {
  id: string;
  name: string;
  description: string;
  price: number;
  order: number;
  sourceImage: ImageI;
  categorie: ItemCategorieI;
  allergenes: AllergeneI[];
  tva: TvaI;
  options: OptionsItemI[];
  visible: boolean;
  promotions: PromotionI[];
  stock: number;
  remarque: string;

}

export class Categorie implements ItemCategorieI {
  id?: string;
  name: string;
  description: string;
  order?: Number;
  iconImage?: ImageI;
  image?: ImageI;
}