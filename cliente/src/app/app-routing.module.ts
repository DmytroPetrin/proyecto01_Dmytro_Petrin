import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';


//rutas que me permiten navegar por la pagina web
const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'private', component: PrivateComponent},
  {path:'admin', component: AdminComponent},
  {path:'login', component: LoginComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
