import { HttpClient } from "@angular/common/http";
import { Injectable, Sanitizer } from "@angular/core";




@Injectable({
    providedIn: 'root'   //(Injectable)ESTO PERMITE USAR servicio SIN NECESITAD DE INCLUIR ESTE MODULO DENTRO DE APP.MODULE.TS
  })
export class CartaService {
  
    private URL ="http://localhost:3000";
  
    
  
    constructor(
      private http: HttpClient
     
      ) { }

    registerIngrediente(ingrediente:{NOMBRE: string, ALERGENO: string, IMAGEN: string}){
        //console.log(ingrediente);
        return this.http.post(this.URL+"/pizza/registerIngrediente", ingrediente);
      } 
    
    getIngrediente(){
        return this.http.get(this.URL+"/pizza/getIngrediente");
    }   

    registerCarta(carta:{CARTA: string, NOMBRE: string, PRECIO: string, SIZE: string,
       IMAGEN: Sanitizer, DESCRIPCION: string, INGREDIENTE: Array<string>}){
         return this.http.post(this.URL+"/pizza/registerCarta", carta);
    }

    getCarta(CARTA: string){
      return this.http.post(this.URL+"/pizza/getCarta", CARTA);
    }
}