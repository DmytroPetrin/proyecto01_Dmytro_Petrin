import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


//rutas que me permiten navegar por la pagina web
const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'private', component: PrivateComponent, canActivate:[AuthGuard]}, //se protegen las rutas mediante authguard
  {path:'admin', component: AdminComponent, canActivate:[RoleGuard], data: {expectedRole: 'admin'}}, //se protege la ruta mediante un dato que se muestre tras el login
  {path:'login', component: LoginComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
