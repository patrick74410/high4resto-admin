import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/Auth/authentification.service';
import { ExpireService } from './services/expire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'high4RestoAdminNext';
  constructor(public authenticationService: AuthentificationService,public expireService: ExpireService,private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('expire');
    localStorage.removeItem("currentConnexionI");

  }
}
