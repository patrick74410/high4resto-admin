import { Component, OnInit } from '@angular/core';
import { AllergeneService } from './allergene.service'
import { AllergeneI} from '../interfaces/allergeneI'
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service'
import { MessageI } from '../interfaces/messageI'
import { ExpireService } from '../expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Util } from '../shared/util'

declare var bootstrap:any;

@Component({
  selector: 'app-list-allergene',
  templateUrl: './list-allergene.component.html',
  styleUrls: ['./list-allergene.component.css']
})

export class ListAllergeneComponent implements OnInit {
  allergenes: AllergeneI[]=[];
  selectedAllergene:AllergeneI;
  util=new Util();

  addForm = new FormGroup({
    name:new FormControl('',Validators.required)
  })

  updateForm = new FormGroup({
    name:new FormControl('',Validators.required)
  })

  updateModal:any;
  addModal:any;
  

  addData(): void{
    const message:MessageI={content:'L\'allergene à été rajouté',level:'Info'}
    var name = this.addForm.get("name").value.trim();
    if (!name) { return; }
    this.allergeneService.addAllergene({ name } as AllergeneI).pipe(take(1))
      .subscribe(allergene => {
        this.allergenes.push(allergene);
        this.messageService.add(message);
        this.addForm.reset();
        this.addModal.hide();
      });
    
  }

  updateDataForm(selectedAllergene:AllergeneI):void
  {
    this.updateForm.patchValue({
      name:selectedAllergene.name});
      this.updateModal.show();
      this.selectedAllergene=selectedAllergene;
  }

  onUpdate(): void{

    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.selectedAllergene.name=this.updateForm.get("name").value;
    this.allergeneService.updateAllergene(this.selectedAllergene).pipe(take(1))
      .subscribe(item=>{this.messageService.add(message);this.updateModal.hide()});
  }

  delete(allergene:AllergeneI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'allergene ?",function(){
    that.allergeneService.deleteAllergene(allergene).pipe(take(1)).subscribe( test=>
      {
        var index = that.allergenes.indexOf(allergene);
        that.allergenes.splice(index, 1);
        that.messageService.add(message);        
      }
    );

    },function(){

    });
    
  }

  getAllergenes(): void {
    this.allergeneService.getAllergenes().pipe(take(1)).subscribe(allergenes => this.allergenes=allergenes);
  }

  constructor(private allergeneService:AllergeneService, private alertService: AlertService, private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getAllergenes();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateAllergene'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addAllergene'), {});
  }

}
