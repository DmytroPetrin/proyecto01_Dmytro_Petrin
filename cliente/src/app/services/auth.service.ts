import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'   //ESTO PERMITE USAR AUTH SIN NECESITAD DE INCLUIR ESTE MODULO DENTRO DE APP.MODULE.TS
})
export class AuthService {

  private URL ="http://localhost:3000";

  

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService //sirve para comprobar si el token esta expirado
    ) { }

  //HAY QUE PONER TIPO DE VARIABLE A VARIABLE USER NO PUEDE SER ANY
  signin(user:any){
    return this.http.post(this.URL+"/user/signin",user);
  }
  
  isAuth():boolean{
    var token = localStorage.getItem('token');
    if(token !== null) {
      if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
      }
    }else if(token==null) return false;
    
    return true;
  }
}
