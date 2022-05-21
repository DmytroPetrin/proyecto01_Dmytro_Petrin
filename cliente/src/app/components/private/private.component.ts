
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
  public posOferta: number[] = [];
  public comentario: string[][] = [];
  public comentarioOferta: string[][][] = [];

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
   // this.compraService.getIdCliente().subscribe((res:any)=>{console.log(res);});
    /*
    this.getOfertas();
    this.getEntrantes();
    this.getBebida();
    this.getPostres();
    this.getExtra();
    this.carta_Oferta();
    */
   
    
    console.log(this.carta);
    console.log(this.pizza);
    console.log(this.entrante);
    console.log(this.cartaOferta);
    console.log(this.arr_cantidad);
    console.log(this.ingrediente);
    console.log(this.cantidad_ingredienteOferta);
    console.log(this.menuOferta);

  }
  
  ngDoCheck(): void {
    console.log(this.menuOferta);
    console.log(this.unionCartaOferta);
    console.log(this.posOferta);
    console.log(this.visible2Oferta);
    //console.log(this.cantidad_ingredienteOferta);
    if(this.botonPulsado) {
      this.precioTotal();
      this.botonPulsado = false;
      console.log(this.cantidad_ingrediente);
    }
        //console.log('es un evento');
        console.log("visible2Oferta");
        console.log( this.visible2Oferta);
   }
/*
 test(){
   const CLIENTE = {CLIENTE: 27};
  this.compraService.test(CLIENTE).subscribe({
    next: (res:any)=>{console.log(res);},
    error: (err)=>{console.log(err);},
    complete: ()=>{}
    });
 }
*/
   guardarCompra(){
     //creamos id de la compra y asociamos a cliente
     const id = localStorage.getItem('ID');
     
     if(id){
       const CLIENTE = {CLIENTE: parseInt(id)}
       var COMPRA = 0;
       this.compraService.registrarCompra(CLIENTE).subscribe({
       next: (res:any)=>{COMPRA = res[0].ID_COMPRA; console.log(res);},
       error: (err)=>{console.log(err);},
       complete: ()=>{
         var PIZZA = new Array;
         var ENTRANTES = new Array;
         var OFERTA = new Array;
         var BEBIDA = new Array;
         var POSTRES = new Array;
         var extra = new Array;
         var arr_extra = new Array;
         var producto = ''; 
         var pizzaOferta = 0;
         var entranteOferta = 0;
        for(let i = 0; i<this.carta.length; i++){
           for(let j = 0; j<this.arr_cantidad[i]; j++){
             if(this.carta[i].ID_PIZZA){
               PIZZA.push(this.carta[i].ID_PIZZA);
               extra = [];
               for (let k = 0; k<this.cantidad_ingrediente[i][j].length; k++){
                 if(this.cantidad_ingrediente[i][j][k] > 0){
                   for(let z = 0; z<this.cantidad_ingrediente[i][j][k]; z++){
                     extra.push(this.ingrediente[k].INGREDIENTE);
                   }
                 }
               } 
               producto = "PIZZA";
               if(extra.length>0 || this.comentario[i][j]!=''){
                   arr_extra.push({id: this.carta[i].ID_PIZZA, producto: producto, pizzaOferta: pizzaOferta, entranteOferta: entranteOferta, extra: extra, comentario: this.comentario[i][j]});
               }
              }
             else if(this.carta[i].ID_ENTRANTES){
              ENTRANTES.push(this.carta[i].ID_ENTRANTES);
              extra = [];
              for (let k = 0; k<this.cantidad_ingrediente[i][j].length; k++){
                if(this.cantidad_ingrediente[i][j][k] > 0){
                  for(let z = 0; z<this.cantidad_ingrediente[i][j][k]; z++){
                    extra.push(this.ingrediente[k].INGREDIENTE);
                  }
                }
              } 
              producto = "ENTRANTES";
              if(extra.length>0 || this.comentario[i][j]!=''){
                  arr_extra.push({id: this.carta[i].ID_ENTRANTES, producto: producto, pizzaOferta: pizzaOferta, entranteOferta: entranteOferta, extra: extra, comentario: this.comentario[i][j]});
              }
            }
            else if(this.carta[i].ID_OFERTA){
              OFERTA.push(this.carta[i].ID_OFERTA);
              const x = this.posicionOferta(i);
              producto = "OFERTA";
              if(x>-1){
                for(let k = 0; k<this.menuOferta[x].length; k++){
                    pizzaOferta = 0;
                    entranteOferta = 0;
                    extra = [];
                     if(this.menuOferta[x][k].ID_PIZZA){
                        pizzaOferta = this.menuOferta[x][k].ID_PIZZA;
                        for(let z = 0; z<this.cantidad_ingredienteOferta[x][j][k].length; z++){
                          if(this.cantidad_ingredienteOferta[x][j][k][z]>0){
                            for(let y = 0; y<this.cantidad_ingredienteOferta[x][j][k][z]; y++){
                              extra.push(this.ingrediente[z].INGREDIENTE);
                            }
                          }
                        }
                        if(extra.length>0 || this.comentarioOferta[x][j][k]!=''){
                          arr_extra.push({id: this.carta[i].ID_OFERTA, producto: producto, pizzaOferta: pizzaOferta, entranteOferta: entranteOferta, extra: extra, comentario: this.comentarioOferta[x][j][k]});
                        }
                        
                    }
                    else if(this.menuOferta[x][k].ID_ENTRANTES){
                      entranteOferta = this.menuOferta[x][k].ID_ENTRANTES;
                      for(let z = 0; z<this.cantidad_ingredienteOferta[x][j][k].length; z++){
                        if(this.cantidad_ingredienteOferta[x][j][k][z]>0){
                          for(let y = 0; y<this.cantidad_ingredienteOferta[x][j][k][z]; y++){
                            extra.push(this.ingrediente[z].INGREDIENTE);
                          }
                        }
                      }
                      if(extra.length>0 || this.comentarioOferta[x][j][k]!=''){
                        arr_extra.push({id: this.carta[i].ID_OFERTA, producto: producto, pizzaOferta: pizzaOferta, entranteOferta: entranteOferta, extra: extra, comentario: this.comentarioOferta[x][j][k]});
                      }
                  }
                }
              }
            }
            else if(this.carta[i].ID_BEBIDA){
              BEBIDA.push(this.carta[i].ID_BEBIDA);
            }
            else if(this.carta[i].ID_POSTRES){
              POSTRES.push(this.carta[i].ID_POSTRES);
            }
           } 
            producto = ''; 
            pizzaOferta = 0;
            entranteOferta = 0;
         };
        var arr = {COMPRA, OFERTA, PIZZA, BEBIDA, ENTRANTES, POSTRES}
         this.compraService.registrarcompraLista(arr).subscribe({
           next: (res:any)=>{},
           error: (err)=>{console.log(err);},
           complete: ()=>{
             var DESCRIPCION = '';
              var mod = {COMPRA, arr_extra};
              this.compraService.registrarModificacion(mod).subscribe({
                next: (res:any)=>{},
                error: (err)=>{console.log(err);},
                complete: ()=>{}
              });
           }
       });
         
       }
     }); 
     }
    
   }



counter(i: number) {
    return new Array(i);
}

  

  //BORRA PRODUCTO DEL CARRITO
  borrarProducto(i:number){
      const x = this.posicionOferta(i);
      if(x>-1){
        var arrOf = new Array;
        var arrVisibleof = new Array;
        var arrVisible2of = new Array;
        var arrUnion = new Array;
        var arrmenuOf = new Array;
        var arringtotalOf = new Array;
        var arrcomOf = new Array;
        for (let j=0;j< this.cantidad_ingredienteOferta.length; j++){
          if(j!=x){
             arrOf.push(this.cantidad_ingredienteOferta[j]);
             //arrVisibleof.push(this.visibleOferta[j]);
             arrVisible2of.push(this.visible2Oferta[j]);
             arrUnion.push(this.unionCartaOferta[j]);
             arrmenuOf.push(this.menuOferta[j]);
             arringtotalOf.push(this.cantidadTotalOferta_producto[j]);
             arrcomOf.push(this.comentarioOferta[j]);
          }
        }
        this.cantidad_ingredienteOferta = arrOf;
        //this.visibleOferta = arrVisibleof;
        this.visible2Oferta = arrVisible2of;
        this.unionCartaOferta = arrUnion;
        this.menuOferta = arrmenuOf;
        this.cantidadTotalOferta_producto = arringtotalOf;
        this.comentarioOferta = arrcomOf;
      }
      var arrCarta = new Array;
      var arrCantidad = new Array;
      var arrCarrito = new Array;
      var arrCantidadIngrediente  = new Array;
      var arrvisible = new Array;
      var arrvisible2 = new Array;
      var arringtotal = new Array;
      var arrcom = new Array;
      for (let p = 0; p<this.carta.length; p++){
        if(i!=p){
            arrCarta.push(this.carta[p]);
            arrCantidad.push(this.arr_cantidad[p]);
            arrCantidadIngrediente.push(this.cantidad_ingrediente[p]);
            arrvisible.push(this.visible[p]);
            arrvisible2.push(this.visible2[p]);
            arringtotal.push(this.cantidadTotal_producto[p]);
            arrcom.push(this.comentario[p]);
        }
      }
      this.carta = arrCarta;
      this.arr_cantidad = arrCantidad;
      this.cantidad_ingrediente = arrCantidadIngrediente;
      this.visible = arrvisible;
      this.visible2 = arrvisible2;
      this.cantidadTotal_producto = arringtotal;
      this.comentario = arrcom;
      for(let t = 0; t<this.arr_carrito.length; t++){
        if((2*i) != t ||((2*i)+1) !=t ){
          arrCarrito.push(this.arr_carrito[t]);
        }
      }
      this.arr_carrito = arrCarrito;
      this.posicionOferta(0);

      this.compraService.borrarCarrito(i);
      this.botonPulsado = true;
  }

  //BORRA CANTIDAD DE PRODUCTO
  borrarProducto2(i:number, j:number){
   if(this.arr_cantidad[i]>1){
       this.borrarCantidad_ingrediente(i, j);
       this.arr_cantidad[i]=this.arr_cantidad[i]-1;
       this.compraService.borrarCantidad(i);
       const x = this.posicionOferta(i);
       console.log("es x: "+x+" es i: "+i);
       if(x>-1){
           this.borrarCantidad_ingredienteOferta(x,j);
       }
       this.botonPulsado = true;
    }else if(this.arr_cantidad[i]==1){this.borrarProducto(i);}
  }
  
  //esta funcion es mas rapida que .filter
  borrarCantidad_ingrediente(i: number, j: number){
   
    var arr = new Array;
    var cant_arr = new Array;
    var com_arr = new Array;
    for(let k = 0; k<this.cantidad_ingrediente[i].length; k++){
      if(k!=j){
          arr.push(this.cantidad_ingrediente[i][k]);
          cant_arr.push(this.cantidadTotal_producto[i][k]);
          com_arr.push(this.comentario[i][k]);
      }
    }
    this.cantidad_ingrediente[i] = arr;
    this.cantidadTotal_producto[i] = cant_arr;
    this.comentario[i]=com_arr;
  }

  borrarCantidad_ingredienteOferta(x:number, j:number){
    
    var arr = new Array;
    var cant_arr = new Array;
    var com = new Array;
    for(let k = 0; k<this.cantidad_ingredienteOferta[x].length; k++){
      if(k!=j){
        arr.push(this.cantidad_ingredienteOferta[x][k]);
        cant_arr.push(this.cantidadTotalOferta_producto[x][k]);
        com.push(this.comentarioOferta[x][k]);
      }
    }
    this.cantidad_ingredienteOferta[x] = arr;
    this.cantidadTotalOferta_producto[x] = cant_arr;
    this.comentarioOferta[x]=com;
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
    this.comentario[i].push('');
    this.cantidadTotal_producto[i].push(0);
    
    const x = this.posicionOferta(i);
    console.log(i);
    if(x>-1){
      var d = new Array;
      var b = new Array;
      var c = new Array;
      var com = new Array;
      this.visible2Oferta[x][0].forEach(element=>{
         d.push(false);
         com.push('');
      });
      this.cantidad_ingredienteOferta[x][0].forEach(element2=>{
        var a = new Array;
       
        c.push(0);
        this.ingrediente.forEach(element =>{
         a.push(0);
      });
      b.push(a);
      });
      this.cantidad_ingredienteOferta[x].push(b);
      this.cantidadTotalOferta_producto[x].push(c);
      //console.log(this.visible2Oferta);
      this.visible2Oferta[x].push(d);
      this.comentarioOferta[x].push(com);
      //console.log(this.visible2Oferta);

    }
    this.botonPulsado = true;
    console.log(this.visible2Oferta);
    console.log(this.cantidadTotalOferta_producto);
    console.log(this.cantidad_ingredienteOferta);
   }
  
 //aqui hay error
 
  posicionOferta(j: number): number {
    var num = 0;
    var num2 = -1;
    var num3 = 0;
    this.posOferta = [];
    console.log('carta longitud: '+this.carta.length);
    for (let k = 0; k < this.carta.length; k++) {
      this.posOferta.push(-1);
      
      if (this.carta[k]) {
        if (this.carta[k].ID_OFERTA) {
          if (k == j ) {
            num2 = num;
           }
          num++;
        }
      } 
      
      if (this.carta[k]) {
        if (this.carta[k].ID_OFERTA) {
          this.posOferta[k] = num3;
          num3++;
        }
      }
    }
    //console.log(num2);
    return num2;
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
/*
   isVisibleOferta(i:number, j:number){
     if(this.visibleOferta[i][j]==false){
      this.visibleOferta[i][j]= true;
     }
     else if(this.visibleOferta[i][j]==true){
      this.visibleOferta[i][j]=false;
     }
   }
*/
   isVisibleModificarOferta(i:number, j:number, k:number){
       if(this.visible2Oferta[i][j][k]==false){
        this.visible2Oferta[i][j][k]=true;
       }
       else if(this.visible2Oferta[i][j][k]==true){
        this.visible2Oferta[i][j][k]=false;
       }
       console.log("visible2Oferta" + this.visible2Oferta);
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
      complete: () => {
         this.getExtraTerminado = true;
         this.cantidadIngrediente();
         this.productoOferta();
         this.precioTotal();
        }
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

    var com1 = new Array;
    var com2 = new Array;
    var com3 = new Array;
    var num  = 0;
    for (let k = 0; k < this.carta.length; k++) {
      arr=[];
      com1=[];
      var element = this.carta[k];
      
      if (element) {
        if (element.ID_OFERTA) {
          for (let j = 0; j < this.arr_cantidad[num]; j++) {
            xarr = [];
            com2 = [];
            this.cartaOferta.forEach(element2 => {
              if (element.ID_OFERTA == element2.OFERTA) {console.log('valor k:' +k);
                for (let i = 0; i < element2.CANTIDAD; i++) {
                  xarr.push(false);
                  com2.push('');
                  console.log(k + ' ' + this.carta.length+ ' '+element.ID_OFERTA + ' '+element2.CANTIDAD + ' '+ xarr );
                }
              }
            });
            arr.push(xarr);
            com1.push(com2);
          }
          marr.push(arr);
          com3.push(com1);
        }
        num++;
      }
    }
    this.visible2Oferta = marr;
    this.getCartaOferta = false;
    this.comentarioOferta = com3;
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
      this.posicionOferta(-1);
    //console.log(this.posOferta);
   // console.log(this.visible2Oferta);
    //console.log(this.cantidadTotalOferta_producto);
    }
  }

  carta_Oferta() {
    this.cartaService.getCartabyid().subscribe({
      next: (res:any)=>{
      res.forEach((element:any)=>{
        this.cartaOferta.push(element);
      })
    }, 
    error: (err)=>{console.log(err);}, 
    complete: ()=>{
      this.getCartaOferta = true;
    }});
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
        complete: () => { 
          this.getPizzaTerminado = true; 
          this.getOfertas();
          this.carta_Oferta();
        }
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
        complete: () => { 
          this.getOfertaTerminado = true;
          this.getEntrantes();
         }
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
        complete: () => { 
          this.getEntranteTerminado = true; 
          this.getBebida();
        }
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
        complete: () => { 
          this.getBebidaTerminado = true; 
          this.getPostres();
        }
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
        complete: () => { 
          this.getPostreTerminado = true; 
          this.getExtra();
        }
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
         var com_arr = new Array;
           for(let k = 0; k<this.arr_cantidad[j]; k++){
            arr[k]=false;
            com_arr[k]='';
           }
           this.visible2[j] = (arr);
           this.comentario[j]=com_arr;
           arr = [];
           com_arr = [];
       }
  }



}
