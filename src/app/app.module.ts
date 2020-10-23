import { FormsModule } from '@angular/forms';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ListImageComponent } from './list-image/list-image.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAllergeneComponent } from './list-allergene/list-allergene.component';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { AlertService} from './comfirm-dialog/alert.service';
import { MessagesComponent } from './messages/messages.component';
import { ListItemCarteComponent } from './list-item-carte/list-item-carte.component';
import { LoginComponent } from './login/login.component'

import { ErrorInterceptor } from './Auth/error-interceptor.service';
import { JwtInterceptor} from './Auth/jwt-interceptor.service';
import { ListTvaComponent } from './list-tva/list-tva.component';
import { ListOptionsItemComponent } from './list-options-item/list-options-item.component';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@NgModule({
  declarations: [
    AppComponent,
    ListAllergeneComponent,
    ListCategorieComponent,
    ListImageComponent,
    ComfirmDialogComponent,
    MessagesComponent,
    ListItemCarteComponent,
    LoginComponent,
    ListTvaComponent,
    ListOptionsItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    NgxPicaModule
  ],   
  providers:
  [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AlertService,{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
