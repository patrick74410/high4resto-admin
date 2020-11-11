import { Component, OnInit } from '@angular/core';
import { ImageCategorieService } from '../../services/ImageCategorie.service'
import { ImageCategorieI} from '../../interfaces/ImageCategorie'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/messageI'
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var bootstrap:any;

@Component({
  selector: 'app-imageCategorie',
  templateUrl: './imageCategorie.component.html',
  styleUrls: ['./imageCategorie.component.css']
})
export class ImageCategorieComponent implements OnInit {
  imageCategories: ImageCategorieI[];
  selectedImageCategorie: ImageCategorieI;
  
  addForm= new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl(''),
    visible:new FormControl(''),
  });

  updateForm = new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl(''),
    visible:new FormControl(''),
  });

  updateModal:any;
  addModal:any;


  onSelect(imageCategorie:ImageCategorieI)
  {
    this.selectedImageCategorie=imageCategorie;
  }
 
  addData(): void{
    var name=this.addForm.get("name").value;
    var description=this.addForm.get("description").value;
    var visible=this.addForm.get("visible").value;
    const message:MessageI={content:'La catégorie à été rajouté',level:'Info'}
    if (!name) { return; }
    this.imageCategorieService.addImageCategorie({ name,description,visible } as ImageCategorieI)
      .pipe(take(1)).subscribe(imageCategorie => {
        this.imageCategorieService.refreshList();
        this.imageCategorieService.getImageCategories().pipe(take(1)).subscribe(imageCategories=>{this.imageCategories=imageCategories})
        this.messageService.add(message);
        this.addForm.reset();
        this.addModal.hide();
      });    
  }

  delete(imageCategorie:ImageCategorieI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la imageCategorie ?",function(){
    that.imageCategorieService.deleteImageCategorie(imageCategorie).pipe(take(1)).subscribe( test=>
      {
        var index = that.imageCategories.indexOf(imageCategorie);
        that.imageCategories.splice(index, 1);
        that.messageService.add(message);        
      }
    );
    that.selectedImageCategorie=null;
    },function(){

    });
    
  }

  updateDataForm(selectedImageCategorie:ImageCategorieI):void{
    this.updateForm.patchValue({name:selectedImageCategorie.name,description: selectedImageCategorie.description,visible: selectedImageCategorie.visible});
    this.updateModal.show();
    this.selectedImageCategorie=selectedImageCategorie;
  }

  onUpdate(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'};
    this.selectedImageCategorie.name=this.updateForm.get("name").value;
    this.selectedImageCategorie.description=this.updateForm.get("description").value;
    this.selectedImageCategorie.visible=this.updateForm.get("visible").value;
    this.imageCategorieService.updateImageCategorie(this.selectedImageCategorie)
      .pipe(take(1)).subscribe(item=>{
        this.messageService.add(message);
        this.updateModal.hide();
      });
  }

  getImageCategories(): void {
    this.imageCategorieService.getImageCategories().pipe(take(1)).subscribe(imageCategories => this.imageCategories=imageCategories);
  }

  constructor(private imageCategorieService:ImageCategorieService, private alertService: AlertService, private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getImageCategories();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'), {});
  }

}
