import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ItemCarteI } from 'src/app/interfaces/ItemCarteI';
import { ItemPreparationI } from 'src/app/interfaces/ItemPreparation';
import { MessageI } from 'src/app/interfaces/MessageI';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { ExpireService } from 'src/app/services/expire.service';
import { ItemCarteService } from 'src/app/services/item-carte.service';
import { ItemPreparationService } from 'src/app/services/itemPreparation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-to-preparation',
  templateUrl: './item-to-preparation.component.html',
  styleUrls: ['./item-to-preparation.component.css']
})
export class ItemToPreparationComponent implements OnInit {
  allItemRoles:ItemPreparationI[];
  roles:string[];
  roleForAdd: string[]=[];
  currentItemRole: ItemPreparationI;

  selectItem(item:ItemCarteI): void{
    this.itemPreparationService.getItemRolesWithId(item.id).pipe(take(1)).subscribe(itemRole=>{
      this.currentItemRole=itemRole;
      this.roleForAdd=this.roles.filter((item)=>{
        return !itemRole.roleName.some(e=> e==item);
      })
    })
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

  save():void{
    this.itemPreparationService.updateItemRole(this.currentItemRole).pipe(take(1)).subscribe(item=>{
      const message: MessageI = { content: 'Les données ont été misent à jour',level: 'Info'};
      this.messageService.add(message);
    })
  }

  constructor(public authenticationService: AuthentificationService,private expireService: ExpireService,private messageService: MessageService,private userService:UserService,private itemPreparationService:ItemPreparationService,private itemCarteService:ItemCarteService) {
    this.expireService.check();
    this.userService.getRoles().pipe(take(1)).subscribe(roles=>{
      this.roles=roles;
    })
    this.itemPreparationService.getItemRoles().pipe(take(1)).subscribe(itemRoles=>{
      this.allItemRoles= itemRoles;
      this.itemCarteService.getItemCartes().pipe(take(1)).subscribe(items=>{
        for (let item of items)
        {
          var present: boolean= false;
          for (let itemRole of this.allItemRoles)
          {
            if(itemRole.id== item.id)
            present=true;
          }
          if(!present)
          {
            var addItemRole:ItemPreparationI={id:item.id,roleName:[],part:0.1,name:item.name,time:10};
            this.itemPreparationService.addItemRole(addItemRole).pipe(take(1)).subscribe(r=>{});
          }
        }
      })
    })
   }

  ngOnInit(): void {
  }

}
