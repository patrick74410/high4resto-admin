import { Component } from '@angular/core';
import { ExpireService } from './services/expire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'high4RestoAdminNext';
  constructor(public expireService: ExpireService){}
}
