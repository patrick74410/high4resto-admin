import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgxPicaService,NgxPicaErrorInterface,NgxPicaResizeOptionsInterface } from '@digitalascetic/ngx-pica';
import { AspectRatioOptions, ExifOptions } from '@digitalascetic/ngx-pica/lib/ngx-pica-resize-options.interface';
import {ImageI} from '../interfaces/imageI'
import { ImageService} from './image.service'
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService } from '../message.service';
import { MessageI } from '../interfaces/messageI';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})

export class ListImageComponent implements OnInit {
  imgURL: any;
  tpFile: File;
  images:ImageI[];
  addImage:ImageI;
  selectedImage:ImageI;
  name:String;
  urlDownload:String="http://localhost:8080/images/download/";

  keepRatio:boolean=true;
  width=800;
  heigth=600;

  onSelect(image:ImageI)
  {
    this.selectedImage=image;
  }

  upload(description:string,group:string): void { 
    var fileImages:File;
    
    this._ngxPicaService.resizeImage(this.tpFile, this.width,this.heigth,new ImageResizeOptions(this.keepRatio))
        .subscribe((imageResized: File) => {
            let reader: FileReader = new FileReader();
            
            reader.addEventListener('load', (event: any) => {
                fileImages=event.target.result;
              }, false);
            reader.readAsArrayBuffer(imageResized);
            this.imageService.uploadImage(new File([imageResized],this.tpFile.name),description,group).subscribe(test=> 
              {
                
                this.width=800;
                this.heigth=600;
                this.imgURL="";
                this.name="";
                this.getImages();
                const message:MessageI={content:'L\'image a bien été rajoutée',level:'Info'}
                this.messageService.add(message);
                    
              });
        }, (err: NgxPicaErrorInterface) => {
            const message:MessageI={content:'Il y a eu une erreux lors de l\'importation de l\'image',level:'Erreur'}
            this.messageService.add(message);
            throw err.err;
        });
    
   }

  getImages(): void {
    this.imageService.getImages().subscribe(images => this.images=images.sort((n1,n2)=>{
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
      that.imageService.deleteImageGrid(image).subscribe();
      that.imageService.deleteImage(image).subscribe( test=>
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


  update():void{
    const message:MessageI={content:'La modification a bien été effectuée',level:'info'}

    this.imageService.updateImage(this.selectedImage).subscribe(item=>this.messageService.add(message));
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

  constructor(private messageService:MessageService,private _ngxPicaService: NgxPicaService, private imageService:ImageService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getImages();
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
