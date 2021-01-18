import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../../environement/environement';
import { ConnexionI } from '../../interfaces/ConnexionI';
import { UserService } from '../user.service';
import { UserI } from 'src/app/interfaces/UserI';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private currentConnexionISubject: BehaviorSubject<ConnexionI>;
  public currentConnexionI: Observable<ConnexionI>;


  public admin(): boolean {
    if (localStorage.getItem("admin") == "1")
      return true;
    else
      return false;
  }
  public manager(): boolean {
    if (localStorage.getItem("manager") == "1")
      return true;
    else
      return false;
  }
  public editor(): boolean {
    if (localStorage.getItem("editor") == "1")
      return true;
    else
      return false;
  }
  public userName(): string {
    return localStorage.getItem("userName");
  }

  constructor(private http: HttpClient, private userService: UserService) {
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
        localStorage.setItem("expire", oneday.toJSON());
        localStorage.setItem('currentConnexionI', JSON.stringify(connexion));
        this.currentConnexionISubject.next(connexion);
        this.http.get<UserI>(environment.apiUrl + '/users/me').pipe(take(1)).subscribe(user => {
          if (user.roles.includes("ROLE_ADMIN"))
            localStorage.setItem("admin", "1");
          if (user.roles.includes("ROLE_MANAGER"))
            localStorage.setItem("manager", "1");
          if (user.roles.includes("ROLE_EDITOR"))
            localStorage.setItem("editor", "1");
          localStorage.setItem("userName", user.username);
        })

        return connexion;
      }));
  }


  logout() {
    localStorage.removeItem('currentConnexionI');
    localStorage.removeItem('expire');
    localStorage.removeItem('admin');
    localStorage.removeItem('manager');
    localStorage.removeItem('editor');
    localStorage.removeItem('userName')
    this.currentConnexionISubject.next(null);
  }
}