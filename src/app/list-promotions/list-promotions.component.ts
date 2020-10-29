import { Component, OnInit } from '@angular/core';
import { PromotionService } from './promotion.service'
import { PromotionI} from '../interfaces/promotionI'
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service'
import { MessageI } from '../interfaces/messageI'
import { ExpireService } from '../expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Util } from '../shared/util'

declare var bootstrap:any;

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.css']
})

export class ListPromotionsComponent implements OnInit {
  promotions:PromotionI[];
  selectedPromotion:PromotionI;
  util=new Util();

  addForm = new FormGroup({
    name:new FormControl('',Validators.required),
    reduction:new FormControl('',Validators.required),
    heureDebut:new FormControl(''),
    heureFin:new FormControl(''),
    dateDebut:new FormControl('',Validators.required),
    dateFin:new FormControl('',Validators.required),
    lundi:new FormControl(''),
    mardi:new FormControl(''),
    mercredi:new FormControl(''),
    jeudi:new FormControl(''),
    vendredi:new FormControl(''),
    samedi:new FormControl(''),
    dimanche:new FormControl(''),
    jourFerie:new FormControl(''),
    pourcentage:new FormControl('')
  })

  updateForm = new FormGroup({
    name:new FormControl('',Validators.required),
    reduction:new FormControl('',Validators.required),
    heureDebut:new FormControl(''),
    heureFin:new FormControl(''),
    dateDebut:new FormControl('',Validators.required),
    dateFin:new FormControl('',Validators.required),
    lundi:new FormControl(''),
    mardi:new FormControl(''),
    mercredi:new FormControl(''),
    jeudi:new FormControl(''),
    vendredi:new FormControl(''),
    samedi:new FormControl(''),
    dimanche:new FormControl(''),
    jourFerie:new FormControl(''),
    pourcentage:new FormControl('')
  })

  updateModal:any;
  addModal:any;

  addData(): void{
    const message:MessageI={content:'La promotion a été rajoutée',level:'Info'}
    var name = this.addForm.get("name").value;
    var reduction = this.addForm.get("reduction").value;
    var heureDebut = this.addForm.get("heureDebut").value;
    var heureFin = this.addForm.get("heureFin").value;
    var dateDebut = this.addForm.get("dateDebut").value;
    var dateFin = this.addForm.get("dateFin").value;
    var jourValide= [
      this.addForm.get("lundi").value,
      this.addForm.get("mardi").value,
      this.addForm.get("mercredi").value,
      this.addForm.get("jeudi").value,
      this.addForm.get("vendredi").value,
      this.addForm.get("samedi").value,
      this.addForm.get("dimanche").value,
    ];
    var jourFerie=this.addForm.get("jourFerie").value;
    var pourcentage=this.addForm.get("pourcentage").value;

    this.promotionService.addPromotion({ name,reduction,heureDebut,heureFin, dateDebut,dateFin,jourValide,jourFerie,pourcentage } as PromotionI).pipe(take(1))
      .subscribe(promotions => {
        this.promotions.push(promotions);
        this.messageService.add(message);
        this.addForm.reset();
        this.addModal.hide();
      });
  }

  updateDataForm(selectedPromotion:PromotionI):void
  {
    this.updateForm.patchValue({
      name:selectedPromotion.name,
      reduction:selectedPromotion.reduction,
      heureDebut:selectedPromotion.heureDebut,
      heureFin:selectedPromotion.heureFin,
      dateDebut:selectedPromotion.dateDebut,
      dateFin:selectedPromotion.dateFin,
      lundi:selectedPromotion.jourValide[0],
      mardi:selectedPromotion.jourValide[1],
      mercredi:selectedPromotion.jourValide[2],
      jeudi:selectedPromotion.jourValide[3],
      vendredi:selectedPromotion.jourValide[4],
      samedi:selectedPromotion.jourValide[5],
      dimanche:selectedPromotion.jourValide[6],
      jourFerie:selectedPromotion.jourFerie,
      pourcentage:selectedPromotion.pourcentage
    });
      this.updateModal.show();
      this.selectedPromotion=selectedPromotion;
  }

  onUpdate(): void{
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.selectedPromotion.name=this.updateForm.get("name").value;
    this.selectedPromotion.reduction=this.updateForm.get("reduction").value;
    this.selectedPromotion.heureDebut=this.updateForm.get("heureDebut").value;
    this.selectedPromotion.heureFin=this.updateForm.get("heureFin").value;
    this.selectedPromotion.dateDebut=this.updateForm.get('dateDebut').value;
    this.selectedPromotion.dateFin=this.updateForm.get('dateFin').value;
    this.selectedPromotion.jourValide=[
      this.updateForm.get('lundi').value,
      this.updateForm.get('mardi').value,
      this.updateForm.get('mercredi').value,
      this.updateForm.get('jeudi').value,
      this.updateForm.get('vendredi').value,
      this.updateForm.get('samedi').value,
      this.updateForm.get('dimanche').value
    ];
    this.selectedPromotion.jourFerie=this.updateForm.get("jourFerie").value;
    this.selectedPromotion.pourcentage=this.updateForm.get('pourcentage').value;
    this.promotionService.updatePromotion(this.selectedPromotion).pipe(take(1))
      .subscribe(item=>{this.messageService.add(message);this.updateModal.hide()});
  }

  delete(promotion:PromotionI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer cette promotion ?",function(){
    that.promotionService.deletePromotion(promotion).pipe(take(1)).subscribe( test=>
      {
        var index = that.promotions.indexOf(promotion);
        that.promotions.splice(index, 1);
        that.messageService.add(message);        
      }
    );

    },function(){
    });  
  }

  getPromotions(): void {
    this.promotionService.getPromotions().pipe(take(1)).subscribe(promotions => this.promotions=promotions);
  }
  
  constructor(private alertService:AlertService,private promotionService:PromotionService,private expireService:ExpireService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getPromotions();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'), {});
  }

}
