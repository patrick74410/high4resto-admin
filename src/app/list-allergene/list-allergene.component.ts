import { Component, OnInit } from '@angular/core';
import { AllergeneService } from './allergene.service'
import { AllergeneI} from '../interfaces/allergeneI'
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service'
import { MessageI } from '../interfaces/messageI'

@Component({
  selector: 'app-list-allergene',
  templateUrl: './list-allergene.component.html',
  styleUrls: ['./list-allergene.component.css']
})

export class ListAllergeneComponent implements OnInit {
  allergenes: AllergeneI[];
  selectedAllergene: AllergeneI;
  

  onSelect(allergene:AllergeneI)
  {
    this.selectedAllergene=allergene;
  }
 
  add(name:String): void{
    const message:MessageI={content:'L\'allergene à été rajouté',level:'Info'}
    name = name.trim();
    if (!name) { return; }
    this.allergeneService.addAllergene({ name } as AllergeneI)
      .subscribe(allergene => {
        this.allergenes.push(allergene);
        this.messageService.add(message);
      });    
  }

  delete(allergene:AllergeneI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'allergene ?",function(){
    that.allergeneService.deleteAllergene(allergene).subscribe( test=>
      {
        var index = that.allergenes.indexOf(allergene);
        that.allergenes.splice(index, 1);
        that.messageService.add(message);        
      }
    );
    that.selectedAllergene=null;
    },function(){

    });
    
  }

  update(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.allergeneService.updateAllergene(this.selectedAllergene)
      .subscribe(item=>{this.messageService.add(message);});
  }

  getAllergenes(): void {
    this.allergeneService.getAllergenes().subscribe(allergenes => this.allergenes=allergenes);
  }

  constructor(private allergeneService:AllergeneService, private alertService: AlertService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getAllergenes();
  }

}
