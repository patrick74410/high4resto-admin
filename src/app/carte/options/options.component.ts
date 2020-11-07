import { Component, OnInit } from '@angular/core';
import { OptionsItemService } from '../../interfaces/options-service'
import { OptionsItemI } from '../../interfaces/OptionsItem'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertService } from '../../rootComponent/comfirm-dialog/alert.service';
import { MessageService } from '../../rootComponent/messages/message.service'
import { MessageI } from '../../interfaces/messageI';
import { ExpireService } from '../../services/expire.service';
import { OptionItemI } from '../../interfaces/OptionItem';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-list-options-item',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsItemComponent implements OnInit {
  optionsItems: OptionsItemI[] = [];
  selectedOptionsItem: OptionsItemI;
  selectedChoix: OptionItemI;
  addOptionsItem: OptionsItemI = new ListOptions();

  addForm = new FormGroup({
    label: new FormControl('', Validators.required),
    unique: new FormControl('')
  });

  updateForm = new FormGroup({
    label: new FormControl('', Validators.required),

    unique: new FormControl('')
  });

  updateModal: any;
  addModal: any;


  dropChoix(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.addOptionsItem.options, event.previousIndex, event.currentIndex);
  }

  dropChoixUpd(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedOptionsItem.options, event.previousIndex, event.currentIndex);
  }

  onSelect(optionsItem: OptionsItemI) {
    this.selectedOptionsItem = optionsItem;
  }

  onSelectChoix(choix: OptionItemI) {
    this.selectedChoix = choix;
  }

  deleteChoixAdd(choix: OptionItemI) {
    var index = this.addOptionsItem.options.indexOf(choix);
    this.addOptionsItem.options.splice(index, 1);
  }

  deleteChoixUpd(choix: OptionItemI) {
    var index = this.selectedOptionsItem.options.indexOf(choix);
    this.selectedOptionsItem.options.splice(index, 1);
  }

  addChoix(label: string, price: string) {
    const choix: OptionItemI = { price: Number(price), label: label, selected: false };
    this.addOptionsItem.options.push(choix);
  }

  addChoixUpd(label: string, price: string) {
    const choix: OptionItemI = { price: Number(price), label: label, selected: false };
    this.selectedOptionsItem.options.push(choix);
  }

  addData(): void {
    if (this.addForm.valid) {
      this.addOptionsItem.label = this.addForm.get('label').value;
      this.addOptionsItem.unique = this.addForm.get('unique').value;
      const message: MessageI = { content: 'L\'option à été rajoutée', level: 'Info' }
      this.optionsItemService.addOption(this.addOptionsItem)
        .pipe(take(1)).subscribe(option => {
          this.optionsItems.push(this.addOptionsItem);
          this.addOptionsItem = new ListOptions();
          this.messageService.add(message);
          this.addForm.reset();
          this.addModal.hide();
        });
    }
    else {
      const message: MessageI = { content: 'Il doit y avoir au moin un label à l\'option', level: 'Attention' }
      this.messageService.add(message);

    }
  }

  delete(option: OptionsItemI): void {
    const message: MessageI = { content: 'L\'élément à été supprimé', level: 'Attention' }

    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la catégorie ?", function () {
      that.optionsItemService.deleteOption(option).pipe(take(1)).subscribe(test => {
        var index = that.optionsItems.indexOf(option);
        that.optionsItems.splice(index, 1);
        that.messageService.add(message);
      }
      );
      that.selectedOptionsItem = null;
    }, function () {

    });
  }

  updateDataForm(selectedOption: OptionsItemI): void {
    this.updateForm.patchValue({ label: selectedOption.label, unique: selectedOption.unique });
    this.updateModal.show();
    this.selectedOptionsItem = selectedOption;
  }


  onUpdate(): void {
    const message: MessageI = { content: 'La modification a été enregistrée', level: 'Info' }
    this.selectedOptionsItem.label = this.updateForm.get("label").value;
    this.selectedOptionsItem.unique = this.updateForm.get("unique").value;
    this.optionsItemService.updateOption(this.selectedOptionsItem)
      .pipe(take(1)).subscribe(item => { this.messageService.add(message); this.updateModal.hide() });
  }

  getOptions(): void {
    this.optionsItemService.getOptionsItems().pipe(take(1)).subscribe(options => this.optionsItems = options);
  }

  constructor(private optionsItemService: OptionsItemService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  ngOnInit(): void {
    this.getOptions();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'), {});
  }

}

export class ListOptions implements OptionsItemI {
  id?: String;
  options: OptionItemI[] = [];
  unique: boolean = false;
  label: string;
}

