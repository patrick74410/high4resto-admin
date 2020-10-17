import { Injectable } from '@angular/core';
import { messageI } from './interfaces/messageI'

declare var bootstrap:any;

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: messageI[]=[];

  async add(message: messageI) {
    this.messages.push(message);
    await new Promise(resolve => setTimeout(()=>resolve(), 1000)).then(()=>{
      var toastElList = [].slice.call(document.querySelectorAll('.toast'))
      var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl) 
      });
     toastList.forEach(toast => toast.show());
    });
  }

  delMessage(message:messageI) {
    var index = this.messages.indexOf(message);
    this.messages.splice(index, 1);         
  }

  constructor() { }
}
