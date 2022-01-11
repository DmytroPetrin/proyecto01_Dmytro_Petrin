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



//rutas que me permiten navegar por la pagina web
const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'private', component: PrivateComponent, canActivate:[RoleGuard], data: {expectedRole: 'cliente'}}, //se protegen las rutas mediante authguard
  {path:'admin', component: AdminComponent, canActivate:[RoleGuard], data: {expectedRole: 'admin'}}, //se protege la ruta mediante un dato que se muestre tras el login
  {path:'empleado', component: EmpleadoComponent, canActivate:[RoleGuard], data: {expectedRole: 'empleado'}},
  {path:'login', component: LoginComponent},
  {path:'registrar', component: RegistrarComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
