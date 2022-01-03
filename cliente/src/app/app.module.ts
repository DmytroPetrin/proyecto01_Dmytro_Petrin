import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

//providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, 
    AppRoutingModule
  ],
  providers: [
    //jwt
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,  //permite condificar y decodificar tokens desde servidor
    //token interceptor
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
  
})

export class AppModule { }
