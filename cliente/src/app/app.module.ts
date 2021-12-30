import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';


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
  providers: [],
  bootstrap: [LoginComponent],
  exports: [LoginComponent]
})

export class AppModule { }
