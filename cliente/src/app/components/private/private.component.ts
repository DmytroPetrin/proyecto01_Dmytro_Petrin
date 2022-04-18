
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
  public cartaOferta: any[]=[];
  public menuOferta: any[][]=[];

  public pizza:any[]=[];
  public entrante:any[]=[];
  public bebida:any[]=[];
  public postre:any[]=[];
  public oferta:any[]=[];
 
  public ingrediente:any[]=[];
  public cantidad_ingrediente: number[][][]=[];
  public cantidad_ingredienteOferta: number[][][][]=[];
  public botonPulsado:boolean = false;
  public precioT: number = 0;
  public precioE: number = 0;
  public precioEO: number = 0;
  public visible:boolean[]=[];
  public visible2:boolean[][]=[];
  public visibleOferta: boolean[][]=[];
  public visible2Oferta:boolean[][][]=[];
  public cantidadTotal_producto: number[][] = [];
  public cantidadTotalOferta_producto: number[][][]=[];
  public unionCartaOferta: number[]=[];

  public getExtraTerminado = false;
  public getPizzaTerminado = false;
  public getOfertaTerminado = false;
  public getPostreTerminado = false;
  public getEntranteTerminado = false;
  public getBebidaTerminado = false;
  public getCartaOferta = false;

  constructor(private cartaService: CartaService, private compraService: CompraService) { }

  ngOnInit(): void {
   
    this.getCarrito();
    this.getPizza();
    this.getOfertas();
    this.getEntrantes();
    this.getBebida();
    this.getPostres();
    this.getExtra();
    this.carta_Oferta();
    
    
    console.log(this.carta);
    console.log(this.pizza);
    console.log(this.entrante);
    console.log(this.cartaOferta);
    console.log(this.arr_cantidad);
    console.log(this.ingrediente);
  }
  
  ngDoCheck(): void {
    if((this.getOfertaTerminado && this.getPizzaTerminado && 
      this.getEntranteTerminado && this.getBebidaTerminado &&
      this.getPostreTerminado && this.getExtraTerminado && this.getCartaOferta) || this.botonPulsado){
     
      if(this.getExtraTerminado){
         this.cantidadIngrediente();
         this.productoOferta();
         this.getExtraTerminado = false;
      }
      this.precioTotal();
      this.botonPulsado = false;
      console.log(this.cantidad_ingrediente);
    }
    
    
    //console.log('es un evento');
   
   }

counter(i: number) {
    return new Array(i);
}

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
    
    const x = this.posicionOferta(i);
    if(x>-1){
      this.visibleOferta[x].push(false);
    }
    this.botonPulsado = true;
   }
  

  posicionOferta(j: number): number {
    var num = 0;
    for (let k = 0; k < this.carta.length; k++) {
      for (let i = num; i < this.unionCartaOferta.length; i++) {
        if (this.carta[k].ID_OFERTA) {
          if (k == j) {
            return num;
          }
          num++;
        }
      }
    }
    return -1;
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

   isVisibleOferta(i:number, j:number){
     if(this.visibleOferta[i][j]==false){
      this.visibleOferta[i][j]= true;
     }
     else if(this.visibleOferta[i][j]==true){
      this.visibleOferta[i][j]=false;
     }
   }

   isVisibleModificarOferta(i:number, j:number, k:number){
       if(this.visible2Oferta[i][j][k]==false){
        this.visible2Oferta[i][j][k]=true;
       }
       else if(this.visible2Oferta[i][j][k]==true){
        this.visible2Oferta[i][j][k]=false;
       }
       console.log(this.visible2Oferta);
       console.log(this.visible2Oferta[i][j][k]);
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
    this.precioEO = 0;
    this.cantidad_ingredienteOferta.forEach(element =>{
      element.forEach(element2 =>{
        element2.forEach(element3 =>{
          for(let i = 0; i<element3.length; i++){
            if(element3[i] >0){
              this.precioEO = this.precioEO + (this.ingrediente[i].PRECIO * element3[i]);
            }
          }
        });
      });
    });
    this.precioE = this.precioE + this.precioEO;
    // precio extra de oferta , botones detalle-->visibleOfeta, detalle-->detalle-->modificar
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

    ingredienteSumaRestaOferta(i:number, j:number, k:number, z:number, operador:number){
      if(operador == 0){
        this.cantidad_ingredienteOferta[i][j][k][z]++;
        this.cantidadTotalOferta_producto[i][j][k]++;
        this.botonPulsado=true;
      }
      else if(operador == 1){
        this.cantidad_ingredienteOferta[i][j][k][z]--;
        this.cantidadTotalOferta_producto[i][j][k]--
        this.botonPulsado = true;
      }
    }
    
    //genera los array necesarios para botones de oferta
  visible_Oferta() {
    var arr = new Array;
    var xarr = new Array;
    var marr = new Array;
    for (let k = 0; k < this.carta.length; k++) {
      arr=[];
      var element = this.carta[k];
      if (element) {
        if (element.ID_OFERTA) {
          for (let j = 0; j < this.arr_cantidad[k]; j++) {
            xarr = [];
            this.cartaOferta.forEach(element2 => {
              if (element.ID_OFERTA == element2.OFERTA) {
                for (let i = 0; i < element2.CANTIDAD; i++) {
                  xarr.push(false);
                }
              }
            });
            arr.push(xarr);
          }
          marr.push(arr);
        }
      }
    }
    this.visible2Oferta = marr;
    this.getCartaOferta = false;
  }

  ingredienteOferta() {
    var arr1 = new Array;
    var arr2 = new Array;
    var arr3 = new Array;
   
    var arrb = new Array;
    var arrc = new Array;
    this.visible2Oferta.forEach(element => {
      arr1=[];
      arrb=[];
      element.forEach(element2 => {
        arr2=[];
        arrc=[];
        element2.forEach(element3 => {
          arr3=[];
          arrc.push(0);
          this.ingrediente.forEach(element4 => {
            arr3.push(0);  
          });
         arr2.push(arr3);
        });
        arr1.push(arr2);
        arrb.push(arrc);
      });
      this.cantidad_ingredienteOferta.push(arr1);
      this.cantidadTotalOferta_producto.push(arrb);
    });
  }

  productoOferta() {
    if (this.getCartaOferta && this.getOfertaTerminado && this.getPizzaTerminado && this.getEntranteTerminado &&
      this.getBebidaTerminado && this.getPostreTerminado ) {
      this.carta.forEach(element => {
        if (element.ID_OFERTA) {
          var arr = new Array;
          this.unionCartaOferta.push(element.ID_OFERTA);
          this.cartaOferta.forEach(element2 => {
            if (element.ID_OFERTA == element2.OFERTA) {
              for (let i = 0; i < element2.CANTIDAD; i++) {
                switch (element2.QUE) {
                  case 'P': {
                    this.pizza.forEach(p => {
                      if (p.ID_PIZZA == element2.ID) {
                        arr.push(p);
                      }
                    });
                    break;
                  }
                  case 'E': {
                    this.entrante.forEach(p => {
                      if (p.ID_ENTRANTES == element2.ID) {
                        arr.push(p);
                      }
                    });
                    break;
                  }
                  case 'B': {
                    this.bebida.forEach(p => {
                      if (p.ID_BEBIDA == element2.ID) {
                        arr.push(p);
                      }
                    });
                    break;
                  }
                  case 'PO': {
                    this.postre.forEach(p => {
                      if (p.ID_POSTRES == element2.ID) {
                        arr.push(p);
                      }
                    });
                    break;
                  }
                }
              }
            }
          });
          this.menuOferta.push(arr);
        }
      });
      this.visible_Oferta();
      this.ingredienteOferta();
    console.log(this.menuOferta);
    console.log(this.visible2Oferta);
    console.log(this.cantidadTotalOferta_producto);
    }
  }

  carta_Oferta() {
    this.cartaService.getCartabyid().subscribe({next: (res:any)=>{
      res.forEach((element:any)=>{
        this.cartaOferta.push(element);
      })
    }, 
    error: (err)=>{console.log(err);}, 
    complete: ()=>{this.getCartaOferta = true;}});
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
            this.pizza.push(element);
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
            this.oferta.push(element);
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
            this.entrante.push(element);
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
            this.bebida.push(element);
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
            this.postre.push(element);
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
