import { Component, OnInit } from '@angular/core';
import { TvaService } from './tva.service'
import { TvaI} from '../interfaces/TvaI'
import Bootstrap from 'bootstrap/dist/js/bootstrap';
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service'
import { MessageI } from '../interfaces/messageI'
import { ExpireService } from '../expire.service';

@Component({
  selector: 'app-list-tva',
  templateUrl: './list-tva.component.html',
  styleUrls: ['./list-tva.component.css']
})
export class ListTvaComponent implements OnInit {
  tvas: TvaI[];
  selectedTva: TvaI;
  

  onSelect(tva:TvaI)
  {
    this.selectedTva=tva;
  }
 
  add(taux:Number): void{
    const message:MessageI={content:'La TVA à été rajouté',level:'Info'}
    if (!taux) { return; }
    this.tvaService.addTva({ taux } as TvaI)
      .subscribe(tva => {
        this.tvas.push(tva);
        this.messageService.add(message);
      });    
  }

  delete(tva:TvaI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la tva ?",function(){
    that.tvaService.deleteTva(tva).subscribe( test=>
      {
        var index = that.tvas.indexOf(tva);
        that.tvas.splice(index, 1);
        that.messageService.add(message);        
      }
    );
    that.selectedTva=null;
    },function(){

    });
    
  }

  update(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.tvaService.updateTva(this.selectedTva)
      .subscribe(item=>{this.messageService.add(message);});
  }

  getTvas(): void {
    this.tvaService.getTvas().subscribe(tvas => this.tvas=tvas);
  }

  constructor(private tvaService:TvaService, private alertService: AlertService, private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getTvas();
    this.expireService.check();
  }

}
