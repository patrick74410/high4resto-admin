import { Component, OnInit } from '@angular/core';
import { OptionsItemService } from './options-item.service'
import { OptionsItemI} from '../interfaces/OptionsItem'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../comfirm-dialog/alert.service';
import { MessageService} from '../message.service'
import { MessageI } from '../interfaces/messageI';
import { ExpireService } from '../expire.service';
import { OptionItemI } from '../interfaces/OptionItem';

@Component({
  selector: 'app-list-options-item',
  templateUrl: './list-options-item.component.html',
  styleUrls: ['./list-options-item.component.css']
})

export class ListOptionsItemComponent implements OnInit {
  optionsItems: OptionsItemI[]=[];
  selectedOptionsItem: OptionsItemI;
  selectedChoix: OptionItemI;
  addOptionsItem: OptionsItemI=new ListOptions();

  dropChoix(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.addOptionsItem.options, event.previousIndex, event.currentIndex);
  }

  dropChoixUpd(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedOptionsItem.options, event.previousIndex, event.currentIndex);
  }

  onSelect(optionsItem:OptionsItemI)
  {
    this.selectedOptionsItem=optionsItem;
  }

  onSelectChoix(choix:OptionItemI)
  {
    this.selectedChoix=choix;
  }

  deleteChoixAdd(choix:OptionItemI)
  {
    var index = this.addOptionsItem.options.indexOf(choix);
    this.addOptionsItem.options.splice(index, 1);  
  }

  deleteChoixUpd(choix:OptionItemI)
  {
    var index = this.selectedOptionsItem.options.indexOf(choix);
    this.selectedOptionsItem.options.splice(index, 1);  
  }

  addChoix(label:string,price:string)
  {
    const choix:OptionItemI={price:Number(price),label:label,selected:false};
    this.addOptionsItem.options.push(choix);
  }

  addChoixUpd(label:string,price:string)
  {
    const choix:OptionItemI={price:Number(price),label:label,selected:false};
    this.selectedOptionsItem.options.push(choix);
  }

  add(): void{
    const message:MessageI={content:'L\'option à été rajoutée',level:'Info'}
    this.optionsItemService.addOption(this.addOptionsItem)
      .subscribe(option => {
        this.optionsItems.push(this.addOptionsItem);
        this.addOptionsItem=new ListOptions();
            this.messageService.add(message);
      });    
  }

  delete(option:OptionsItemI):void {
    const message:MessageI={content:'L\'élément à été supprimé',level:'Attention'}

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la catégorie ?",function(){
      that.optionsItemService.deleteOption(option).subscribe( test=>
        {
          var index = that.optionsItems.indexOf(option);
          that.optionsItems.splice(index, 1);
          that.messageService.add(message);    
        }
        );
        that.selectedOptionsItem=null;
    },function(){

    });
  }

  update(): void {
    const message:MessageI={content:'La modification a été enregistrée',level:'Info'}

    this.optionsItemService.updateOption(this.selectedOptionsItem)
      .subscribe(item=>this.messageService.add(message));
  }

  getOptions(): void {
    this.optionsItemService.getOptionsItems().subscribe(options => this.optionsItems=options);
  }

  constructor(private optionsItemService:OptionsItemService, private alertService: AlertService,private messageService:MessageService,private expireService:ExpireService) { }

  ngOnInit(): void {
    this.getOptions();
  }

}

export class ListOptions implements OptionsItemI {
  id?: String;
  options: OptionItemI[]=[];
  unique: boolean=false;
  label: string;
}

