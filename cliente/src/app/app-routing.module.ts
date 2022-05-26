import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
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
import { CarritoCompraComponent } from './components/carrito-compra/carrito-compra.component';
import { PagoComponent } from './components/pago/pago.component';
import { GraciasComponent } from './components/gracias/gracias.component';


//rutas que me permiten navegar por la pagina web
const routes: Routes = [
  {path:'home', component: HomeComponent,
    children:[
      {path: 'oferta', component: OfertaComponent}
    ]
  },
  {path:'private', component: PrivateComponent,   
      children:[
          {path: 'carrito-compra', component: CarritoCompraComponent},
          {path: 'pago', component: PagoComponent},
          {path: 'gracias', component: GraciasComponent}
      ], 
  canActivate:[RoleGuard], data: {expectedRole: 'cliente'}}, //se protege la ruta mediante un dato que se muestre tras el login
  {path:'admin', component: AdminComponent, 
      children:[
          {path:'edhorario', component: AdminEdhorarioComponent},
          {path:'edempleado', component: AdminEdempleadoComponent},
          {path:'edcarta', component: AdminEdcartaComponent},
          {path:'edingrediente', component: AdminEdingredienteComponent},
          {path:'edsalon', component: AdminEdsalonComponent},
          {path:'edoferta', component: AdminEdofertaComponent}
      ],
      canActivate:[RoleGuard], data: {expectedRole: 'admin'}
  },
  {path:'empleado', component: EmpleadoComponent,
      children:[
          {path:'horario', component: EmpleadoHorarioComponent},
          {path:'salon', component: EmpleadoSalonComponent},
          {path:'cocina', component: EmpleadoCocinaComponent},
      ],
      canActivate:[RoleGuard], data: {expectedRole: 'empleado'}
  },
  {path:'login', component: LoginComponent},
  {path:'registrar', component: RegistrarComponent},
  {path:'oferta', component: OfertaComponent},
  {path:'pizza', component: PizzaComponent},
  {path:'entrante', component: EntranteComponent},
  {path:'bebida', component: BebidaComponent},
  {path:'postre', component: PostreComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'oferta'},
  //{path: 'carrito-compra', component: CarritoCompraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
