import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Util } from 'src/app/environement/util';
import { ItemCarteI } from 'src/app/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
import { StockI } from 'src/app/interfaces/StockI';
import { ItemCarteService } from 'src/app/services/item-carte.service';
import { ItemCategorieService } from 'src/app/services/itemCategorie.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit {
  itemCategories: ItemCategorieI[] = [];
  stockItem: StockI = { item: { id: "",remarque:"", name: "", description: "", price: 0, order: 0, sourceImage: null, categorie: null, allergenes: null, tva: null, options: null, visible: false, promotions: null, stock: 1 } };
  items: ItemCarteI[] = [];
  util = new Util();

  @Output()
  newItemEvent = new EventEmitter<ItemCarteI>();

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

  addNewItem(value: ItemCarteI) {
    this.newItemEvent.emit(value);
  }

  constructor(private itemCategorieService: ItemCategorieService, private itemCarteService: ItemCarteService, private http: HttpClient) {
    this.itemCategorieService.getCategories().pipe(take(1)).subscribe(categories => {
      this.itemCategories = categories;
    })
  }

  ngOnInit(): void {
  }

}
