import { Injectable } from '@angular/core';
import { MessageI } from '../../interfaces/MessageI'

declare var bootstrap:any;

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: MessageI[]=[];

  async add(message: MessageI) {
    this.messages.push(message);
    await new Promise(resolve => setTimeout(()=>resolve(), 1000)).then(()=>{
      var toastElList = [].slice.call(document.querySelectorAll('.toast'))
      var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl) 
      });
     toastList.forEach(toast => toast.show());
    });
  }

  delMessage(message:MessageI) {
    var index = this.messages.indexOf(message);
    this.messages.splice(index, 1);         
  }

  constructor() { }
}
