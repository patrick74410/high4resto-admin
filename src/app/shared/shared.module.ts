import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [ImageModalComponent],
  exports: [ImageModalComponent]
})
export class SharedModule { }
