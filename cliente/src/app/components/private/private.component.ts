
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, DoCheck {
  
  public arr_carrito:string[]=[];
  public arr_cantidad:number[]=[];
  public arr_cantidadOld: number[]=[0];
  public carta:any[]=[];
 
  public ingrediente:any[]=[];
  public cantidad_ingrediente: number[][][]=[];
  
  public botonPulsado:boolean = false;
  public precioT: number = 0;
  public precioE: number = 0;
  public visible:boolean[]=[];
  public visible2:boolean[][]=[];
  public cantidadTotal_producto: number[][] = [];

  public getExtraTerminado = false;
  public getPizzaTerminado = false;
  public getOfertaTerminado = false;
  public getPostreTerminado = false;
  public getEntranteTerminado = false;
  public getBebidaTerminado = false;

  constructor(private cartaService: CartaService, private compraService: CompraService) { }

  ngOnInit(): void {
   
    this.getCarrito();
    this.getPizza();
    this.getOfertas();
    this.getEntrantes();
    this.getBebida();
    this.getPostres();
    this.getExtra();
    
    
    console.log(this.carta);
    
    console.log(this.arr_cantidad);
    console.log(this.ingrediente);
  }
  
  ngDoCheck(): void {
    if((this.getOfertaTerminado && this.getPizzaTerminado && 
      this.getEntranteTerminado && this.getBebidaTerminado &&
      this.getPostreTerminado && this.getExtraTerminado) || this.botonPulsado){
     
      if(this.getExtraTerminado){
         this.cantidadIngrediente();
         this.getExtraTerminado = false;
      }
      this.precioTotal();
      this.botonPulsado = false;
      console.log(this.cantidad_ingrediente);
    }
    //console.log('es un evento');
    console.log(this.visible2);
   }

counter(i: number) {
    return new Array(i);
}
 
//prueba de callback


  getIdCliente(){
    this.compraService.getIdCliente().subscribe((res:any)=>{
      //console.log(res[0].ID);
      localStorage.setItem('ID_compra', res[0].ID);
    });
  }

  //BORRA PRODUCTO DEL CARRITO
  borrarProducto(i:number){
      delete this.carta[i];
      delete this.arr_cantidad[i];
      delete this.arr_carrito[2*i];
      delete this.arr_carrito[(2*i)+1];
      delete this.cantidad_ingrediente[i];
      this.compraService.borrarCarrito(i);
      this.botonPulsado = true;
  }

  //BORRA CANTIDAD DE PRODUCTO
  borrarProducto2(i:number, j:number){
   if(this.arr_cantidad[i]>1){
       this.borrarCantidad_ingrediente(i, j);
       this.arr_cantidad[i]=this.arr_cantidad[i]-1;
       this.compraService.borrarCantidad(i);
       this.botonPulsado = true;
    }else if(this.arr_cantidad[i]==1){this.borrarProducto(i);}
  }
  
  //esta funcion es mas rapida que .filter
  borrarCantidad_ingrediente(i: number, j: number){
    var num = 0;
    var arr = new Array;
    var cant_arr = new Array;
    for(let k = 0; k<this.cantidad_ingrediente[i].length; k++){
      if(k!=j){
          arr.push(this.cantidad_ingrediente[i][k]);
          cant_arr.push(this.cantidadTotal_producto[i][k]);
          num++;
      }
    }
    this.cantidad_ingrediente[i] = arr;
    this.cantidadTotal_producto[i] = cant_arr;
  }

  //AÑADE CANTIDAD DE PRODUCTO
  addProducto(i:number){
    this.arr_cantidad[i]=this.arr_cantidad[i]+1;
    var arr = new Array;
    this.ingrediente.forEach(element => {
        arr.push(0); 
    });
    this.cantidad_ingrediente[i].push(arr);
    this.compraService.addCantidad(i);
    this.visible2[i].push(false);
    this.cantidadTotal_producto[i].push(0);
    this.botonPulsado = true;
   }

   // visibilidad del boton detalle
   isVisible(i:number){
      if(this.visible[i]==false){
        this.visible[i]=true;
      }
      else  if(this.visible[i]==true){
        this.visible[i]=false;
      }
   }
 
   //visibilidad del boton modificar
   isVisibleModificar(i:number, j:number){
      if(this.visible2[i][j]==false){
        this.visible2[i][j]=true;
       }
       else if(this.visible2[i][j]==true){
        this.visible2[i][j]=false;
       }
   }

  precioTotal(){
    this.precioT=0;
    this.precioExtra(); 
    this.precioT = this.precioE;
    for(let i = 0; i<this.carta.length; i++){ 
        if(this.carta[i] != null){
          this.precioT = this.precioT + (this.carta[i].PRECIO * this.arr_cantidad[i]);
        }  
    }
  }

  precioExtra() {
    this.precioE = 0;
    for (let i = 0; i < this.cantidad_ingrediente.length; i++) {
      if (this.cantidad_ingrediente[i] != null) {
        for (let k = 0; k < this.cantidad_ingrediente[i].length; k++) {
          for (let j = 0; j < this.ingrediente.length; j++) {
            if (this.cantidad_ingrediente[i][k][j] > 0) {
              this.precioE = this.precioE + (this.ingrediente[j].PRECIO * this.cantidad_ingrediente[i][k][j]);
            }
          }
        }
      }
    }
  }

  /* subscribe contiene tres modos de funcionamiento next, error, complete */
  getExtra() {
    this.cartaService.getExtra().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.ingrediente.push(element);
        });
      },
      error: (err) => { console.log(err); },
      complete: () => { this.getExtraTerminado = true; }
    });
  }

  cantidadIngrediente() {
    this.cantidad_ingrediente =[];
    for(let j = 0; j< this.carta.length; j++) {
      var xarr = new Array;
      var cant_arr = new Array;
      for (let i = 0; i < this.arr_cantidad[j]; i++) {
        cant_arr.push(0); 
        var arr = new Array;
        this.ingrediente.forEach((element3: any) => {
          arr.push(0);
        });
        xarr[i] = arr;
      }
      this.cantidad_ingrediente.push(xarr);
      this.cantidadTotal_producto.push(cant_arr);
    }
    //console.log(this.cantidad_ingrediente);
  }

  ingredienteSumaResta(i:number, j:number, k:number, operador:number){
      if(operador == 0){
       this.cantidad_ingrediente[i][j][k]++;
       this.cantidadTotal_producto[i][j]++;
       this.botonPulsado = true;
      }
      else if(operador == 1){
        this.cantidad_ingrediente[i][j][k]--;
        this.cantidadTotal_producto[i][j]--;
        this.botonPulsado = true;
      }
    }
  
    //{next: (res:any)=>{}, error: (err)=>{console.log(err);}, complete: ()=>{}}
  getPizza() {
    if (this.arr_carrito != []) {
      this.cartaService.getPizza().subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            var num = -1;
            this.arr_carrito.forEach((carrito: any) => {
              num++;
              if (carrito.substring(0, 1) == "p" && carrito.substring(1) == element.ID_PIZZA) {
                this.carta[num / 2] = element;
              }
            });
          });
        },
        error: (err) => { console.log(err); },
        complete: () => { this.getPizzaTerminado = true; }
      });
    }
  }

  getOfertas() {
    if (this.arr_carrito != []) {
      this.cartaService.getOferta().subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            var num = -1;
            this.arr_carrito.forEach((carrito: any) => {
              num++;
              if (carrito.substring(0, 1) == "o" && carrito.substring(1) == element.ID_OFERTA) {
                this.carta[num / 2] = element;
              }
            });
          });
        },
        error: (err) => { console.log(err); },
        complete: () => { this.getOfertaTerminado = true; }
      });
    }
  }

 

  getEntrantes() {
    if (this.arr_carrito != []) {
      this.cartaService.getEntrantes().subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            var num = -1;
            this.arr_carrito.forEach((carrito: any) => {
              num++;
              if (carrito.substring(0, 1) == "e" && carrito.substring(1) == element.ID_ENTRANTES) {
                this.carta[num / 2] = element;
              }
            });
          });
        },
        error: (err) => { console.log(err); },
        complete: () => { this.getEntranteTerminado = true; }
      }
      );
    }
  }

   //{next: (res:any)=>{}, error: (err)=>{console.log(err);}, complete: ()=>{}}
  getBebida() {
    if (this.arr_carrito != []) {
      this.cartaService.getBebida().subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            var num = -1;
            this.arr_carrito.forEach((carrito: any) => {
              num++;
              if (carrito.substring(0, 1) == "b" && carrito.substring(1) == element.ID_BEBIDA) {
                this.carta[num / 2] = element;
              }
            });
          });
        },
        error: (err) => { console.log(err); },
        complete: () => { this.getBebidaTerminado = true; }
      });
    }
  }

  getPostres() {
    if (this.arr_carrito != []) {
      this.cartaService.getPostres().subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            var num = -1;
            this.arr_carrito.forEach((carrito: any) => {
              num++;
              if (carrito.substring(0, 1) == "x" && carrito.substring(1) == element.ID_POSTRES) {
                this.carta[num / 2] = element;
              }
            });
          });
        },
        error: (err) => { console.log(err); },
        complete: () => { this.getPostreTerminado = true; }
      });
    }
  }

  getCarrito() {
    const carr = localStorage.getItem('carrito');
    const cli = localStorage.getItem('ID');
    const compra = localStorage.getItem('ID_compra');
    var num = -1;
    if (cli && carr) {
      this.arr_carrito = carr.split(",");
      this.arr_carrito.forEach(element => {
        num++;
        if (num % 2 != 0 && element != '') {
          this.arr_cantidad[(num-1)/2] = (parseInt(element));
          this.visible[(num-1)/2]=false;
        }
      });
    }

   //Visiblidad de boton modificar
        for (let j = 0; j<this.arr_cantidad.length; j++){
         var arr = new Array;
           for(let k = 0; k<this.arr_cantidad[j]; k++){
            arr[k]=false;
           }
           this.visible2[j] = (arr);
           arr = [];
       }
  }



}
