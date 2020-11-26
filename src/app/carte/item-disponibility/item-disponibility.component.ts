import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Util } from 'src/app/environement/util';
import { BetweenTimeI } from 'src/app/interfaces/BetweenTimeI';
import { HoraireI } from 'src/app/interfaces/HoraireI';
import { ItemCarteI } from 'src/app/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/app/interfaces/ItemCategorieI';
import { ItemDisponibilityI } from 'src/app/interfaces/ItemDisponibility';
import { MessageI } from 'src/app/interfaces/MessageI';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { ExpireService } from 'src/app/services/expire.service';
import { HoraireService } from 'src/app/services/horaire.service';
import { ItemCarteService } from 'src/app/services/item-carte.service';
import { ItemCategorieService } from 'src/app/services/itemCategorie.service';
import { ItemDisponibilityService } from 'src/app/services/itemDisponibility.service';

declare var bootstrap: any;
@Component({
  selector: 'app-item-disponibility',
  templateUrl: './item-disponibility.component.html',
  styleUrls: ['./item-disponibility.component.css']
})

export class ItemDisponibilityComponent implements OnInit {
  defaultHoraire: HoraireI;
  items: ItemCarteI[] = [];
  itemDisponibilitys: ItemDisponibilityI[];
  currentDisponibility: ItemDisponibilityI = null;
  itemCategories: ItemCategorieI[];
  updateModal: any;

  util = new Util();


  updateDataForm(id: string): void {
    this.getDisponibility(id);
    this.updateModal.show();
  }

  saveData() {
    this.itemDisponibilityService.updateDisponibility(this.currentDisponibility).pipe(take(1)).subscribe(t => {
      const message: MessageI = { content: 'Les modifications ont été enregistrées', level: 'Info' };
      this.messageService.add(message);
      this.updateModal.hide();
    })
  }

  addBetween(debut, fin, day: number): void {
    if (debut.value && fin.value) {
      switch (day) {
        case 0:
          this.currentDisponibility.disponibility.lundi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.lundi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 1:
          this.currentDisponibility.disponibility.mardi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.mardi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 2:
          this.currentDisponibility.disponibility.mercredi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.mercredi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 3:
          this.currentDisponibility.disponibility.jeudi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.jeudi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 4:
          this.currentDisponibility.disponibility.vendredi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.vendredi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 5:
          this.currentDisponibility.disponibility.samedi.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.samedi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 6:
          this.currentDisponibility.disponibility.dimanche.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.dimanche.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
        case 7:
          this.currentDisponibility.disponibility.ferie.push({ debut: debut.value, fin: fin.value } as BetweenTimeI)
          this.currentDisponibility.disponibility.lundi.sort((a, b) => {
            if (a.debut > b.debut)
              return 1
            else if (a.debut < b.debut)
              return -1
            else
              return 0
          });
          break;
      }
    }
    else {
      const message: MessageI = { content: 'Un élément d\'currentDisponibility.disponibility doit contenir une heure de début et une heure de fin', level: 'Attention' };
      this.messageService.add(message);
    }
  }

  deleteBetween(between: BetweenTimeI, day: number): void {
    switch (day) {
      case 0:
        var index = this.currentDisponibility.disponibility.lundi.indexOf(between);
        this.currentDisponibility.disponibility.lundi.splice(index, 1);
        break;
      case 1:
        var index = this.currentDisponibility.disponibility.mardi.indexOf(between);
        this.currentDisponibility.disponibility.mardi.splice(index, 1);
        break;
      case 2:
        var index = this.currentDisponibility.disponibility.mercredi.indexOf(between);
        this.currentDisponibility.disponibility.mercredi.splice(index, 1);
        break;
      case 3:
        var index = this.currentDisponibility.disponibility.jeudi.indexOf(between);
        this.currentDisponibility.disponibility.jeudi.splice(index, 1);
        break;
      case 4:
        var index = this.currentDisponibility.disponibility.vendredi.indexOf(between);
        this.currentDisponibility.disponibility.vendredi.splice(index, 1);
        break;
      case 5:
        var index = this.currentDisponibility.disponibility.samedi.indexOf(between);
        this.currentDisponibility.disponibility.samedi.splice(index, 1);
        break;
      case 6:
        var index = this.currentDisponibility.disponibility.dimanche.indexOf(between);
        this.currentDisponibility.disponibility.dimanche.splice(index, 1);
        break;
      case 7:
        var index = this.currentDisponibility.disponibility.ferie.indexOf(between);
        this.currentDisponibility.disponibility.ferie.splice(index, 1);
        break;
    }
  }
  getDisponibility(id: string): void {
    this.itemDisponibilityService.getOne(id).pipe(take(1)).subscribe(disponibility => {
      this.currentDisponibility = disponibility;
      this.currentDisponibility.disponibility.lundi.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.mardi.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.mercredi.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.jeudi.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.vendredi.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.samedi.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.dimanche.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
      this.currentDisponibility.disponibility.ferie.sort((a, b) => {
        if (a.debut > b.debut)
          return 1
        else if (a.debut < b.debut)
          return -1
        else
          return 0
      });
    });
  }

  renewItemList(categorie: ItemCategorieI) {
    this.itemSevice.getItemCartes().pipe(take(1)).subscribe(items => {
      this.items = items.filter(item => item.categorie.id == categorie.id);
    })
  }

  ngOnInit(): void {
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.itemCategorieService.getCategories().pipe(take(1)).subscribe(categories =>
      this.itemCategories = categories
    )

    this.itemDisponibilityService.getDisponibilitys().pipe(take(1)).subscribe(dispo => {
      this.itemDisponibilitys = dispo;
      this.itemSevice.getItemCartes().pipe(take(1)).subscribe(items => {
        for (let item of items) {
          var present: boolean = false;
          for (let dispo of this.itemDisponibilitys) {
            if (dispo.id == item.id)
              present = true;
          }
          if (!present) {
            var addDispo: ItemDisponibilityI = { id: item.id, disponibility: this.defaultHoraire, always: true, dateFin: "", dateDebut: "" };
            this.itemDisponibilityService.addDisponibility(addDispo).pipe(take(1)).subscribe(t => {
            })
          }
        }
      })
    })
  }
  constructor(private itemCategorieService: ItemCategorieService, private messageService: MessageService, private expireService: ExpireService, private horaireService: HoraireService, private itemDisponibilityService: ItemDisponibilityService, private itemSevice: ItemCarteService) { }

}
