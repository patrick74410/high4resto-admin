import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service'
import { AlbumI} from '../../interfaces/AlbumI'
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/messageI'
import { ExpireService } from '../../services/expire.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Util } from '../../environement/util'
import { ImageService} from '../../services/image.service'
import { ImageI } from '../../interfaces/imageI';
import { environment } from '../../environement/environement';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

declare var bootstrap:any;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  images:ImageI[];
  albums: AlbumI[]=[];
  selectedAlbum: AlbumI;
  addAlbum:AlbumI;
  util=new Util();

  displayedColumns: string[] = ['group,description,image'];

  urlDownload:String=environment.apiUrl+"/images/download/";
  
  addForm = new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl(''),
    visible: new FormControl('')
  })

  updateForm = new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl(''),
    visible:new FormControl('')
  })

  updateModal:any;
  addModal:any;
  
  loadListImage():void{
    this.imageService.getImages().pipe(take(1)).subscribe(images=>{
      this.images=images;
    });
  }

  addData(): void{
    const message:MessageI={content:'L\'album a été rajouté',level:'Info'}
    this.addAlbum.name = this.addForm.get("name").value;
    this.addAlbum.description = this.addForm.get("description").value;
    this.albumService.addAlbum(this.addAlbum).pipe(take(1))
      .subscribe(album => {
        this.albums.push(album);
        this.messageService.add(message);
        this.addForm.reset();
        this.addModal.hide();
        this.addAlbum.name='';
        this.addAlbum.description='';
        this.addAlbum.photos=[];
        this.addAlbum.visible=false;
      });
  }

  updateDataForm(selectedAlbum:AlbumI):void
  {
    this.imageService.getImages().pipe(take(1)).subscribe(images=>{
      this.images=images.filter((item)=>{
        return !selectedAlbum.photos.some(e=>e.id==item.id)
      });
      this.updateForm.patchValue({
        name:selectedAlbum.name,
        description:selectedAlbum.description,
        visible:selectedAlbum.visible
      });
        this.updateModal.show();
        this.selectedAlbum=selectedAlbum;
  
    });
  }

  onUpdate(): void{

    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}
    this.selectedAlbum.name=this.updateForm.get("name").value;
    this.selectedAlbum.description=this.updateForm.get("description").value;
    this.selectedAlbum.visible=this.updateForm.get("visible").value;
    this.albumService.updateAlbum(this.selectedAlbum).pipe(take(1))
      .subscribe(item=>{this.messageService.add(message);this.updateModal.hide()});
  }

  delete(album:AlbumI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer l'album ?",function(){
    that.albumService.deleteAlbum(album).pipe(take(1)).subscribe( test=>
      {
        var index = that.albums.indexOf(album);
        that.albums.splice(index, 1);
        that.messageService.add(message);        
      }
    );

    },function(){

    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getAlbums(): void {
    this.albumService.getAlbums().pipe(take(1)).subscribe(albums => this.albums=albums);
  }

  constructor(private imageService:ImageService, private albumService:AlbumService, private alertService: AlertService, private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.addAlbum={name:'',description:'',photos:[],visible:false};
    this.getAlbums();
    this.expireService.check();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateAlbum'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addAlbum'), {});
  }

}
