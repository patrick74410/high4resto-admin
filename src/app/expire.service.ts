import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpireService {
  check():void{
    var expire:Date=JSON.parse(localStorage.getItem('connexionExpire'));
    if(expire>new Date())
    {
      localStorage.removeItem('connexionExpire');
      localStorage.removeItem('currentConnexionI');
    }    
  }
  constructor() { }
}
