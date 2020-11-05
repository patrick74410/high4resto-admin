import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './Auth/authentification.service';
import { ConnexionI } from './interfaces/connexionI';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentConnexion: ConnexionI;
  title = 'high4resto';

  goTo(url:string): void {
    this.router.navigate([url]);
  }
 
  constructor(private location: Location,private router: Router,private authentificationService: AuthentificationService) {
    this.authentificationService.currentConnexionI.subscribe(x => this.currentConnexion = x);
  }
}
