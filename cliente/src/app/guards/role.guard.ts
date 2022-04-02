import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import  decode  from 'jwt-decode';
import { LoginComponent } from '../components/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router,
    //public loginComponent: LoginComponent
  ){}
  canActivate(route: ActivatedRouteSnapshot ):boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    //console.log(token);
    if(token!==null ){
    //console.log(decode(token));
    const {NOMBRE, ROL}: {NOMBRE:string, ROL:string} = decode(token); //en typescript las constantes se declaran asi, sino da error porque aplicación desconoce tipo de variable
    if (ROL == 'cliente'){
        const {ID_CLIENTE}: {ID_CLIENTE:string} = decode(token);
        localStorage.setItem('NOMBRE', NOMBRE);
        localStorage.setItem('ID', ID_CLIENTE);
        localStorage.setItem('ROL', ROL);
        // a ver si esto se puede hacer en otra pestaña
    }
    //console.log(ROL);
     
    if(!this.authService.isAuth() || ROL !==expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']); //redirecciona a login
      return false;
    }
    }else if(token==null) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
    
    

  }
  
}
