import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'   
  })
export class CompraService {
  
    private URL ="http://localhost:3000";
    private arr_carrito: string[] =[];
    
  
    constructor(
      private http: HttpClient
     ) { }

     registrarcompraLista(compraLista: {COMPRA: number, OFERTA: number, PIZZA: number, BEBIDA: number, ENTRANTES: number, POSTRES: number}){
         return this.http.post(this.URL+"/compra/registrarcompraLista", compraLista);
     }

     registrarCompra(compra: {RECOGIDA: boolean, CLIENTE: number, DESCRIPCION: string}){
        return this.http.post(this.URL+"/compra/registrarCompra", compra);
     }

     registrarModificacion(mod: {COMPRA:number, PIZZA:number, ENTRANTES:number, EXTRAS:number, COMENTARIO:string, NUM_MOD:number}){
        return this.http.post(this.URL+"/compra/registrarModificacion", mod);
     }

     getcompraOferta(ID:number){
        return this.http.post(this.URL+"/compra/getcompraOferta", ID);
     }

     guardarCarrito(ID:string, cantidad:string){
         const carr = localStorage.getItem('carrito');
         if(carr){
             this.arr_carrito= carr.split(",");
             this.arr_carrito.push(ID);
             this.arr_carrito.push(cantidad);
             localStorage.setItem('carrito', this.arr_carrito.toString()) ;
         }
         else if(!carr){
             this.arr_carrito.push(ID);
             this.arr_carrito.push(cantidad);
             localStorage.setItem('carrito', this.arr_carrito.toString()) ;
         }
             
        

     }





 }