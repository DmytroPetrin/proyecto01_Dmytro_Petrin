import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";





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

    borrarIngrediente(ID:number){
      return this.http.post(this.URL+"/pizza/borrarIngrediente", ID)
    }

      getCarta(CARTA: string){
      const x = {CARTA: CARTA}
      return this.http.post(this.URL+"/pizza/getCarta", x);
    }

      getOferta(){
        return this.http.get(this.URL+"/pizza/getOferta");
      }

      getPizza(){
        return this.http.get(this.URL+"/pizza/getPizza");
      }

      getIngredientePizza(){
        return this.http.get(this.URL+"/pizza/getIngredientePizza");
      }

      getIngredienteEntrantes(){
        return this.http.get(this.URL+"/pizza/getIngredienteEntrantes");
      }

      getEntrantes(){
        return this.http.get(this.URL+"/pizza/getEntrantes");
      }

      getPostres(){
        return this.http.get(this.URL+"/pizza/getPostres");
      }

      getBebida(){
        return this.http.get(this.URL+"/pizza/getBebida");
      }

      borrarCarta(i: {CARTA:string, ID:number}){
        return this.http.post(this.URL+"/pizza/borrarCarta", i); 
      }

      getCartabyid(){
        return this.http.get(this.URL+'/pizza/getCartabyid');
      }

      getIngredientebyid(){
        return this.http.get(this.URL+'/pizza/getIngredientebyid');
      }

      getExtra(){
        return this.http.get(this.URL+'/pizza/getExtra');
      }

    registerExtra(extra:{IMAGEN2:string, PRECIO:string}){
      //console.log(ingrediente);
      return this.http.post(this.URL+"/pizza/registerExtra", extra);
    } 

    registerCarta(carta:{CARTA: string, NOMBRE: string, PRECIO: string, SIZE: string,
       IMAGEN: string, DESCRIPCION: string, INGREDIENTE: Array<string>}){
         return this.http.post(this.URL+"/pizza/registerCarta", carta);
    }

  

    registerOferta(oferta: {NOMBRE: string, PRECIO: string, IMAGEN: string, FECHA_FIN: string, DESCRIPCION: string,
      CARTA: Array<string>, CANTIDAD: Array<number>, NOMBRE_PLATO: Array<string>}){
        console.log(oferta);
        return this.http.post(this.URL+"/pizza/registerOferta", oferta);
      }
}