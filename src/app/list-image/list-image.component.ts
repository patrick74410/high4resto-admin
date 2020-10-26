import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgxPicaService,NgxPicaErrorInterface,NgxPicaResizeOptionsInterface } from '@digitalascetic/ngx-pica';
import { AspectRatioOptions, ExifOptions } from '@digitalascetic/ngx-pica/lib/ngx-pica-resize-options.interface';
import {ImageI} from '../interfaces/imageI'
import { ImageService} from './image.service'
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service';
import { MessageI } from '../interfaces/messageI';
import { ExpireService } from '../expire.service';
import { environment } from '../environement/environement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Util } from '../shared/util';

declare var bootstrap:any;

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})

export class ListImageComponent implements OnInit {
  imgURL: any;
  tpFile: File;
  images:ImageI[];
  selectedImage:ImageI;
  name:String;
  util=new Util();
  urlDownload:String=environment.apiUrl+"/images/download/";

  addForm= new FormGroup(
    {
      description:new FormControl('',Validators.required),
      groupName:new FormControl('',Validators.required),
      widht:new FormControl('',Validators.required),
      heigth:new FormControl('',Validators.required),
      keepRatio:new FormControl('',Validators.required)
    }
  )

  updateForm = new FormGroup({
    description:new FormControl('',Validators.required),
    groupName:new FormControl('',Validators.required)
})

  updateModal:any;
  addModal:any;

  addData(): void { 
    var fileImages:File;
    var description=this.addForm.get("description").value;
    var group=this.addForm.get("groupName").value;

    this._ngxPicaService.resizeImage(this.tpFile, this.addForm.get("widht").value,this.addForm.get("heigth").value,new ImageResizeOptions(this.addForm.get("keepRatio").value))
        .pipe(take(1)).subscribe((imageResized: File) => {
            let reader: FileReader = new FileReader();
            
            reader.addEventListener('load', (event: any) => {
                fileImages=event.target.result;
              }, false);
            reader.readAsArrayBuffer(imageResized);
            this.imageService.uploadImage(new File([imageResized],this.tpFile.name),description,group).pipe(take(1)).subscribe(test=> 
              {
                
                this.addForm.patchValue({widht:800,height:600})
                this.imgURL="";
                this.name="";
                this.getImages();
                const message:MessageI={content:'L\'image a bien été rajoutée',level:'Info'}
                this.messageService.add(message);
                this.addForm.reset();
                this.addModal.hide();
                    
              });
        }, (err: NgxPicaErrorInterface) => {
            const message:MessageI={content:'Il y a eu une erreux lors de l\'importation de l\'image',level:'Erreur'}
            this.messageService.add(message);
            throw err.err;
        });
   }

   updateDataForm(selectedImage:ImageI):void{
     this.updateForm.patchValue({description:selectedImage.description,groupName:selectedImage.group});
     this.updateModal.show();
     this.selectedImage=selectedImage;
   }

   onUpdate():void{
    const message:MessageI={content:'La modification a bien été effectuée',level:'info'}
    this.selectedImage.description=this.updateForm.get("description").value;
    this.selectedImage.group=this.updateForm.get("groupName").value;
    this.imageService.updateImage(this.selectedImage).pipe(take(1)).subscribe(item=>
      {this.messageService.add(message);
      this.updateModal.hide()});
  }



  getImages(): void {
    this.imageService.getImages().pipe(take(1)).subscribe(images => this.images=images.sort((n1,n2)=>{
      if(n1.group>n2.group)
      {
        return 1;
      }
      if(n2.group>n1.group)
      {
        return -1;
      }
      return 0;
    }));
  }

  deleteImage(image:ImageI): void {
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'image ?",function(){
      that.selectedImage=null;
      that.imageService.deleteImageGrid(image).pipe(take(1)).subscribe();
      that.imageService.deleteImage(image).pipe(take(1)).subscribe( test=>
        {
          var index = that.images.indexOf(image);
          that.images.splice(index, 1);        
          const message:MessageI={content:'l\'image à bien été supprimée',level:'Attention'}
          that.messageService.add(message);
        }
        );  
    },function(){

    });
  }

  public handleFiles(event: any) {
    const files: File[] = event.target.files;
    this.tpFile=files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.name=files[0].name; 
  }  

  constructor(private messageService:MessageService,private _ngxPicaService: NgxPicaService, private imageService:ImageService, private alertService: AlertService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getImages();
    this.expireService.check();
    this.addForm.patchValue({widht:800,heigth:600})
    this.updateModal = new bootstrap.Modal(document.getElementById('updateImage'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addImage'), {});

  }

}

export class ImageResizeOptions implements NgxPicaResizeOptionsInterface
{
  quality?: number;
  alpha?: boolean=true;
  unsharpAmount?: number;
  unsharpRadius?: number;
  unsharpThreshold?: number;
  exifOptions= new ImageExifOption(true);
  aspectRatio:ImageAspectRatioOptions;
  constructor(ratio:boolean)
  {
    this.aspectRatio = new ImageAspectRatioOptions(ratio);
  }
}

export class ImageAspectRatioOptions implements AspectRatioOptions {
  keepAspectRatio: boolean;
  forceMinDimensions?: boolean;

  constructor(keepAspectRatio: boolean, forceMinDimensions?: boolean) {
    this.keepAspectRatio = keepAspectRatio;
    this.forceMinDimensions = forceMinDimensions;
  }
}

export class ImageExifOption implements ExifOptions{
  constructor(forceExifOrientation:boolean)
  {
    this.forceExifOrientation=forceExifOrientation;
  }
  forceExifOrientation: boolean;
  
}
