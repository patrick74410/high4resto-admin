import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from '../environement/environement';
import { ImageI } from '../interfaces/imageI';
import { ImageService } from '../list-image/image.service';
import { Util } from '../shared/util';
declare var bootstrap:any;

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  images:ImageI[];
  util = new Util();
  urlDownload:String=environment.apiUrl+"/images/download/";
  selectImage : ImageI;


  @Output() 
    newItemEvent= new  EventEmitter<ImageI>();
  @Input()
    idModal:String;
  @Input()
    showAfterClose:string;

    addNewItem(value: ImageI) {
      this.selectImage=value;
      this.newItemEvent.emit(value);
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

    show(): void {
      if(this.showAfterClose)
      {
        var parentModal=new bootstrap.Modal(document.getElementById(this.showAfterClose), {});
        parentModal.show();
      }
    }

  constructor(private imageService:ImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

}
