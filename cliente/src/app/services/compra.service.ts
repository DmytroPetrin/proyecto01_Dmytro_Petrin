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

     registrarcompraLista(arr: {COMPRA: number, OFERTA: any[], PIZZA: any[], BEBIDA: any[], ENTRANTES: any[], POSTRES:any[]}){
         return this.http.post(this.URL+"/compra/registrarcompraLista", arr);
     }

     registrarCompra( CLIENTE: number){
        return this.http.post(this.URL+"/compra/registrarCompra",CLIENTE);
     }

     registrarModificacion(mod: {COMPRA:number, arr_extra: any[], DESCRIPCION: string}){
        return this.http.post(this.URL+"/compra/registrarModificacion", mod);
     }
     getIdCliente(){
         return this.http.get(this.URL+"/compra/getIdCliente");
     }

     getcompraOferta(ID:number){
        return this.http.post(this.URL+"/compra/getcompraOferta", ID);
     }

     guardarCarrito(ID:string, cantidad:string){
         const carr = localStorage.getItem('carrito');
         if(carr){
             this.arr_carrito= carr.split(",");
             for(let i = 0; i<this.arr_carrito.length; i++){
                 if(this.arr_carrito[i]==ID){  
                     this.arr_carrito[i+1] = (parseInt(this.arr_carrito[i+1]) + parseInt(cantidad)).toString(); console.log("dentro de if carrito" + this.arr_carrito[i+1]);
                     localStorage.setItem('carrito', this.arr_carrito.toString()) ;
                     return;
                 }
             }
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

     borrarCarrito(i: number){
        const carr = localStorage.getItem('carrito');
        var arr = new Array;
        if(carr){
            this.arr_carrito= carr.split(",");
            for(let j = 0; j<this.arr_carrito.length; j++){
            if(j!=(2*i) && j!=((2*i)+1)){
                arr.push(this.arr_carrito[j]);
            }
            };
            localStorage.setItem('carrito', arr.toString());
        }
     }

     borrarCantidad(i:number){
        const carr = localStorage.getItem('carrito');
        if(carr){
            this.arr_carrito= carr.split(",");
            this.arr_carrito[(2*i)+1] = (parseInt(this.arr_carrito[(2*i)+1]) - 1).toString();
            localStorage.setItem('carrito', this.arr_carrito.toString()) ;
        }
     }

     addCantidad(i:number){
        const carr = localStorage.getItem('carrito');
        if(carr){
            this.arr_carrito= carr.split(",");
            this.arr_carrito[(2*i)+1] = (parseInt(this.arr_carrito[(2*i)+1]) + 1).toString();
            localStorage.setItem('carrito', this.arr_carrito.toString()) ;
        }
     }
        

     }





