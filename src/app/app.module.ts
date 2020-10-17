import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';

import { ListImageComponent } from './list-image/list-image.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAllergeneComponent } from './list-allergene/list-allergene.component';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { AlertService} from './comfirm-dialog/alert.service';
import { MessagesComponent } from './messages/messages.component';
import { ListItemMenuComponent } from './list-item-menu/list-item-menu.component'


@NgModule({
  declarations: [
    AppComponent,
    ListAllergeneComponent,
    ListCategorieComponent,
    ListImageComponent,
    ComfirmDialogComponent,
    MessagesComponent,
    ListItemMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    NgxPicaModule
  ],
  providers: [ AlertService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
