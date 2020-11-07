import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environement/environement';
import { ConnexionI } from '../../interfaces/connexionI';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private currentConnexionISubject: BehaviorSubject<ConnexionI>;
  public currentConnexionI: Observable<ConnexionI>;

  constructor(private http: HttpClient) {
      this.currentConnexionISubject = new BehaviorSubject<ConnexionI>(JSON.parse(localStorage.getItem('currentConnexionI')));
      this.currentConnexionI = this.currentConnexionISubject.asObservable();
  }

  public get currentConnexionIValue(): ConnexionI {
      return this.currentConnexionISubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/users/login`, { username, password })
          .pipe(map(connexion => {
              var oneday = new Date();
              oneday.setHours(oneday.getHours() + 9);
              localStorage.setItem("expire",oneday.toJSON());
              localStorage.setItem('currentConnexionI', JSON.stringify(connexion));
              this.currentConnexionISubject.next(connexion);
              return connexion;
          }));
}

logout() {
  localStorage.removeItem('currentConnexionI');
  this.currentConnexionISubject.next(null);
}
}