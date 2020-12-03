import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/app/environement/environement';
import { MessageI } from 'src/app/interfaces/MessageI';
import { OrderI } from 'src/app/interfaces/tracability/Order';
import { ToPrepareI } from 'src/app/interfaces/tracability/ToPrepare';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { PreparateurService } from 'src/app/services/preparateurService';
import { Socket } from 'src/app/services/Socket';
const ROLE="ROLE_COLDCOOK";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})

export class InterfaceComponent implements OnInit {
  private socket:Socket=new Socket(environment.socketColdCook)
  private listener: EventEmitter<any> = new EventEmitter();
  private audioFlux=new Subject<string>();
  toTakeOrder:OrderI[]=[];
  signalOrder: OrderI[] = [];
  toPrepares:ToPrepareI[]=[];

  prepare(order: OrderI)
  {
    var toPrepare:ToPrepareI={order: order, inside: "",executor:this.authenticationService.userName,messageToNext:""};
    this.preparateurService.moveToPrepare(toPrepare).pipe(take(1)).subscribe(toPrep=>{
      this.toPrepares.push(toPrep);
      this.preparateurService.getSignalOrder(ROLE).pipe(take(1)).subscribe(result=>{
        this.signalOrder=result;
      });
      this.preparateurService.getToTakeOrder(ROLE).pipe(take(1)).subscribe(result=>{
        this.toTakeOrder=result;
      });
    });
  }

  private initAllData(): void {
    this.preparateurService.getSignalOrder(ROLE).pipe(take(1)).subscribe(result=>{
      this.signalOrder=result;
    });
    this.preparateurService.getToTakeOrder(ROLE).pipe(take(1)).subscribe(result=>{
      this.toTakeOrder=result;
    });
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
            this.preparateurService.getSignalOrder(ROLE).pipe(take(1)).subscribe(result=>{
              this.signalOrder=result;
            });
           }
           if(value=="afaire")
           {
            this.preparateurService.getSignalOrder(ROLE).pipe(take(1)).subscribe(result=>{
              this.signalOrder=result;
            });
            this.preparateurService.getToTakeOrder(ROLE).pipe(take(1)).subscribe(result=>{
              this.toTakeOrder=result;
            });
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
