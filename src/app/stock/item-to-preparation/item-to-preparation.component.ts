import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ItemCarteI } from 'src/app/interfaces/ItemCarteI';
import { MessageI } from 'src/app/interfaces/MessageI';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { ExpireService } from 'src/app/services/expire.service';
import { ItemCarteService } from 'src/app/services/item-carte.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-to-preparation',
  templateUrl: './item-to-preparation.component.html',
  styleUrls: ['./item-to-preparation.component.css']
})
export class ItemToPreparationComponent implements OnInit {
  roles: string[]=[];
  roleForAdd: string[] = ["ROLE_ADMIN","ROLE_MANAGER","ROLE_WINESTEWARD","ROLE_BARWAITER","ROLE_SERVER","ROLE_DELEVERYMAN","ROLE_HOTCOOK","ROLE_COLDCOOK","ROLE_COOK","ROLE_EDITOR"];
  currentItem:ItemCarteI;
  allItem: ItemCarteI[];

  private addAll():void{
    this.roleForAdd = ["ROLE_ADMIN","ROLE_MANAGER","ROLE_WINESTEWARD","ROLE_BARWAITER","ROLE_SERVER","ROLE_DELEVERYMAN","ROLE_HOTCOOK","ROLE_COLDCOOK","ROLE_COOK","ROLE_EDITOR"];
    this.roleForAdd=this.roleForAdd.filter(a=>{
      if(this.currentItem.roles.includes(a))
        return false;
      else
        return true;
    })
  }

  selectItem(item: ItemCarteI): void {

      this.currentItem=item;
      if(!this.currentItem.roles)
      {
        this.currentItem.roles=[];
      }
      this.addAll();

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  save(): void {
    this.itemCarteService.updateItem(this.currentItem).pipe(take(1)).subscribe(item => {
      const message: MessageI = { content: 'Les données ont été misent à jour', level: 'Info' };
      this.messageService.add(message);
    })
  }

  constructor(public authenticationService: AuthentificationService, private expireService: ExpireService, private messageService: MessageService, private userService: UserService, private itemCarteService: ItemCarteService) {
    this.expireService.check();
    this.userService.getRoles().pipe(take(1)).subscribe(roles => {
      this.roles = roles;
    })

      this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items => {
        this.allItem=items;
      })
  }

  ngOnInit(): void {
  }

}
