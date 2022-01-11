import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'   //(Injectable)ESTO PERMITE USAR AUTH SIN NECESITAD DE INCLUIR ESTE MODULO DENTRO DE APP.MODULE.TS
})
export class AuthService {

  private URL ="http://localhost:3000";

  

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService //sirve para comprobar si el token esta expirado
   
    ) { }

  
  signin(user:{EMAIL: string, PASS: string}){
    return this.http.post(this.URL+"/user/signin",user);
  }
  
  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(token !== null) {
      if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
      }
    }else if(token==null) return false;
    
    return true;
  }

  registerUser(user:{NOMBRE: string, APPELLIDO:string, EMAIL:string, PASS:string,
  TELEFONO:number, FECHA_NACIMIENTO:Date, DIRECCION:string}){
    console.log(user);
      return this.http.put(this.URL+"/user/registerUser", user);
  }

  getCurrentUser():boolean{
    const token = localStorage.getItem('token');
    if(token!==null||token!==undefined){
        return true;
    }else{ return false;}
  }

  async comprobarUsuario(EMAIL:string){
    
    const x = {EMAIL:EMAIL}
    const data = await lastValueFrom(this.http.post(this.URL+"/user/comprobarUsuario", x));
    
    return data;  
      
  }

}
