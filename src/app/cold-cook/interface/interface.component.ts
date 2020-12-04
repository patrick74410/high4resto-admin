import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/app/environement/environement';
import { Util } from 'src/app/environement/util';
import { MessageI } from 'src/app/interfaces/MessageI';
import { OrderI } from 'src/app/interfaces/tracability/Order';
import { ToPrepareI } from 'src/app/interfaces/tracability/ToPrepare';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { PreparateurService } from 'src/app/services/preparateurService';
import { Socket } from 'src/app/services/Socket';
const ROLE="ROLE_COLDCOOK";

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})

export class InterfaceComponent implements OnInit {
  private socket:Socket=new Socket(environment.socketColdCook)
  private listener: EventEmitter<any> = new EventEmitter();
  private audioFlux=new Subject<string>();
  toPrepares:ToPrepareI[]=[];
  signals:Signal[]=[];
  toTakes:ToTake[]=[];

  util = new Util();

  prepare(order: OrderI):void
  {
    var toPrepare:ToPrepareI={order: order, inside: "",executor:this.authenticationService.userName,messageToNext:""};
    this.preparateurService.moveToPrepare(toPrepare).pipe(take(1)).subscribe(toPrep=>{
      this.toPrepares.push(toPrep);
      this.initSignal();
      this.initToTake();
    });
  }

  private initSignal():void
  {
    this.signals=[];
    this.preparateurService.getSignalOrder(ROLE).pipe(take(1)).subscribe(result=>{
      var tpRecord:Record<string, OrderI[]>=groupBy(result,i=>i.preOrder.destination);
      for(let key in tpRecord)
      {
        var tpTable=new Signal();
        tpTable.tableName="Table " +key;

        var reduce=tpRecord[key].reduce((a,b)=>{
          var name=b.preOrder.stock.item.name+" "+b.annonce;
          if (!a.hasOwnProperty(name)) {
            a[name] = 0;
          }
          a[name]++;
          return a;
        },{});

        var reducesExtended=Object.keys(reduce).map(k=>{
          return {name:k,count:reduce[k]} as NameCountI;
        });

        for (let nc in reducesExtended)
        {
          tpTable.items.push(reducesExtended[nc]);
        }

        this.signals.push(tpTable);
      }
    });
  }

  private initToTake(){
    this.preparateurService.getToTakeOrder(ROLE).pipe(take(1)).subscribe(result=>{
      this.toTakes=[];
      var tpRecord:Record<string, OrderI[]>=groupBy(result,i=>i.preOrder.destination)
      for(let key in tpRecord)
      {
        var tpToTake=new ToTake();
        tpToTake.tableName="Table "+key;
        tpToTake.items=tpRecord[key];
        this.toTakes.push(tpToTake);
      }
    });
  }

  private initAllData(): void {
    this.initSignal();
    this.initToTake();
    this.preparateurService.getToPrepare(ROLE).pipe(take(1)).subscribe(result=>{
      this.toPrepares=result;
    });
  }

  constructor(public authenticationService: AuthentificationService,private messageService: MessageService,private preparateurService:PreparateurService) { }

  ngOnInit(): void {
    this.initAllData();
    this.listener=this.socket.getEventListener();
    this.audioFlux.subscribe({
      next:(audio)=> new Audio(environment.apiUrl+"/serveur/download/"+audio).play()
    });
    this.listener.subscribe(event=>{
      if(event.type=="message")
      {
        var txt:string=event.data;
        var command:string=txt.split(":")[0];
        var value:string=txt.split(":")[1];
        if(command=="audio")
          this.audioFlux.next(value);
        if(command=="update")
        {
          if(value=="annonce")
           {
            this.initSignal();
           }
           if(value=="afaire")
           {
            this.initSignal();
            this.initToTake();
           }
        }
      }
      if(event.type=="open")
      {
        console.log("Connexion open");
      }
      if(event.type=="close")
      {
        console.log("Connexion close");
      }
    });
  }

}
export interface NameCountI{
  name:string
  count:number
}

export interface SignalI{
  tableName:string
  items:NameCountI[];
}

export class Signal implements SignalI{
  tableName: string;
  items: NameCountI[]=[];
}

export class ToTake{
  tableName:string;
  items:OrderI[] = [];
}