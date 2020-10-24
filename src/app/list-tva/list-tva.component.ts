import { Component, OnInit } from '@angular/core';
import { TvaService } from './tva.service'
import { TvaI} from '../interfaces/TvaI'
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service'
import { MessageI } from '../interfaces/messageI'
import { ExpireService } from '../expire.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var bootstrap:any;

@Component({
  selector: 'app-list-tva',
  templateUrl: './list-tva.component.html',
  styleUrls: ['./list-tva.component.css']
})
export class ListTvaComponent implements OnInit {
  tvas: TvaI[];
  selectedTva: TvaI;
  
  addForm= new FormGroup({
    taux:new FormControl('',Validators.required),

  });

  updateForm = new FormGroup({
    taux:new FormControl('',Validators.required),
  });

  updateModal:any;
  addModal:any;


  onSelect(tva:TvaI)
  {
    this.selectedTva=tva;
  }
 
  addData(): void{
    var taux=this.addForm.get("taux").value;
    const message:MessageI={content:'La TVA à été rajouté',level:'Info'}
    if (!taux) { return; }
    this.tvaService.addTva({ taux } as TvaI)
      .pipe(take(1)).subscribe(tva => {
        this.tvas.push(tva);
        this.messageService.add(message);
        this.addForm.reset();
        this.addModal.hide();
      });    
  }

  delete(tva:TvaI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la tva ?",function(){
    that.tvaService.deleteTva(tva).pipe(take(1)).subscribe( test=>
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

  updateDataForm(selectedTva:TvaI):void{
    this.updateForm.patchValue({taux:selectedTva.taux});
    this.updateModal.show();
    this.selectedTva=selectedTva;
  }

  onUpdate(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'};
    this.selectedTva.taux=this.updateForm.get("taux").value;
    this.tvaService.updateTva(this.selectedTva)
      .pipe(take(1)).subscribe(item=>{
        this.messageService.add(message);
        this.updateModal.hide();
      });
  }

  getTvas(): void {
    this.tvaService.getTvas().pipe(take(1)).subscribe(tvas => this.tvas=tvas);
  }

  constructor(private tvaService:TvaService, private alertService: AlertService, private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getTvas();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'), {});
  }

}
