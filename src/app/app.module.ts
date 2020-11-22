import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './rootComponent/messages/messages.component'
import {ComfirmDialogComponent } from './rootComponent/comfirm-dialog/comfirm-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './rootComponent/login/login.component';
import { AlertService } from './rootComponent/comfirm-dialog/alert.service';
import { AuthGuardService } from './services/Auth/auth-guard.service';
import { JwtInterceptor } from './services/Auth/jwt-interceptor.service';
import { ErrorInterceptor } from './services/Auth/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    ComfirmDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AlertService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
