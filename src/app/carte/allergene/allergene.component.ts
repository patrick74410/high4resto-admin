import { Component, OnInit } from '@angular/core';
import { AllergeneService } from '../../services/allergene.service'
import { AllergeneI} from '../../interfaces/AllergeneI'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/MessageI'
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Util } from '../../environement/util'

declare var bootstrap:any;

@Component({
  selector: 'app-allergene',
  templateUrl: './allergene.component.html',
  styleUrls: ['./allergene.component.css']
})

export class AllergeneComponent implements OnInit {
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
    const message:MessageI={content:'L\'allergene a été rajouté',level:'Info'}
    var name = this.addForm.get("name").value.trim();
    if (!name) { return; }
    this.allergeneService.addAllergene({ name } as AllergeneI).pipe(take(1))
      .subscribe(allergene => {
        this.allergeneService.resetList();
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
