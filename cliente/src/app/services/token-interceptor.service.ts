import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  //se crea automaticamente la cabezera de cada token para seguir el estandart
  
  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
    const token = localStorage.getItem('token');
    const tokenHeader = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+token 
      }
    });
    return next.handle(tokenHeader);
  }
}
