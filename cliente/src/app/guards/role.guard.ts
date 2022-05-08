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
    
  ){}
  canActivate(route: ActivatedRouteSnapshot ):boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    
    if(token!==null ){
    
    const {NOMBRE, ROL}: {NOMBRE:string, ROL:string} = decode(token); //en typescript las constantes se declaran asi, sino da error porque aplicación desconoce tipo de variable
        
     
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
