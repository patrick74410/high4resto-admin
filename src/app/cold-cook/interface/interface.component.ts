import { Component, EventEmitter, OnInit } from '@angular/core';
import { environment } from 'src/app/environement/environement';
import { MessageI } from 'src/app/interfaces/MessageI';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { Socket } from 'src/app/services/Socket';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  private socket:Socket=new Socket(environment.socketColdCook)
  private listener: EventEmitter<any> = new EventEmitter();
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.listener=this.socket.getEventListener();
    this.listener.subscribe(event=>{
      if(event.type=="message")
      {
        console.log(event.data);
        var audio = new Audio(environment.apiUrl+"/serveur/download/"+event.data);
        audio.play();
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
