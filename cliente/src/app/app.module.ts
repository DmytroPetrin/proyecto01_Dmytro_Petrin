import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

//providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EmpleadoHorarioComponent } from './components/empleado-horario/empleado-horario.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { EmpleadoSalonComponent } from './components/empleado-salon/empleado-salon.component';
import { EmpleadoCocinaComponent } from './components/empleado-cocina/empleado-cocina.component';
import { AdminEdhorarioComponent } from './components/admin-edhorario/admin-edhorario.component';
import { AdminEdempleadoComponent } from './components/admin-edempleado/admin-edempleado.component';
import { AdminEdcartaComponent } from './components/admin-edcarta/admin-edcarta.component';
import { AdminEdsalonComponent } from './components/admin-edsalon/admin-edsalon.component';
import { AdminEdingredienteComponent } from './components/admin-edingrediente/admin-edingrediente.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { EntranteComponent } from './components/entrante/entrante.component';
import { BebidaComponent } from './components/bebida/bebida.component';
import { PostreComponent } from './components/postre/postre.component';
import { AdminEdofertaComponent } from './components/admin-edoferta/admin-edoferta.component';
import { CommonModule } from '@angular/common';
import { CarritoCompraComponent } from './components/carrito-compra/carrito-compra.component';
//import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagoComponent } from './components/pago/pago.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    PrivateComponent,
    AdminComponent,
    LoginComponent,
    EmpleadoComponent,
    RegistrarComponent,
    EmpleadoHorarioComponent,
    OfertaComponent,
    EmpleadoSalonComponent,
    EmpleadoCocinaComponent,
    AdminEdhorarioComponent,
    AdminEdempleadoComponent,
    AdminEdcartaComponent,
    AdminEdsalonComponent,
    AdminEdingredienteComponent,
    PizzaComponent,
    EntranteComponent,
    BebidaComponent,
    PostreComponent,
    AdminEdofertaComponent,
    CarritoCompraComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, 
    AppRoutingModule, ReactiveFormsModule, CommonModule, BrowserAnimationsModule
  ],
  providers: [
    //jwt
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,  //permite condificar y decodificar tokens desde servidor
    //token interceptor
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule {};


/*
@NgModule({
  imports:[MatFormFieldModule],
  exports:[MatFormFieldModule]

});

export class MaterialModule{};
*/
