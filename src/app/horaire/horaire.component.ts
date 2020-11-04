import { Component, OnInit } from '@angular/core';
import { HoraireService } from './horaire.service'
import { Util } from '../shared/util'
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service'
import { MessageI } from '../interfaces/messageI'
import { ExpireService } from '../expire.service';
import { take } from 'rxjs/operators';
import { HoraireI } from '../interfaces/HoraireI'
import { BetweenTimeI } from '../interfaces/BetweenTimeI';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})

export class HoraireComponent implements OnInit {
  horaire: HoraireI;
  util = new Util();

  save():void
  {
    this.horaireService.updateHoraire(this.horaire).pipe(take(1)).subscribe(t=>{
      const message:MessageI={content:'L\'horaire a été enregistré',level:'Info'};
      this.messageService.add(message);
    });
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
  getHoraire(): void {
    this.horaireService.getHoraires().pipe(take(1)).subscribe(horaire => {
      this.horaire = horaire[0];
      this.horaire.lundi.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.mardi.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.mercredi.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.jeudi.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.vendredi.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.samedi.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.dimanche.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });
      this.horaire.ferie.sort((a,b)=>{
        if(a.debut>b.debut)
          return 1
        else if(a.debut<b.debut)
          return -1
        else
          return 0
      });      
    });
  }

  constructor(private horaireService: HoraireService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.expireService.check;
    this.getHoraire();

  }

}
