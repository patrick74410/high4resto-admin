import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageModalComponent],
  exports: [ImageModalComponent]
})
export class SharedModule { }
