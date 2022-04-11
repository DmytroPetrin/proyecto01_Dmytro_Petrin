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
  public carta:any[]=[];
  public ingrediente:any[]=[];
  public precioT: number = 0;
  public precioT_old = -1;
  
  constructor(private cartaService: CartaService, private compraService: CompraService) { }

  ngOnInit(): void {
    this.getCarrito();
    this.getPizza();
    this.getOfertas();
    this.getEntrantes();
    this.getBebida();
    this.getPostres();
    this.getIngredientePizza();
    
    console.log(this.ingrediente);
    console.log(this.carta);
  }
  
  ngDoCheck(): void {
    if(this.carta.length>0 && this.precioT!=this.precioT_old){
      this.precioTotal();
      this.precioT_old = this.precioT;
    }
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

  borrarProducto(i:number){
      delete this.carta[i];
      delete this.arr_cantidad[i];
      delete this.arr_carrito[2*i];
      delete this.arr_carrito[(2*i)+1];
      this.compraService.borrarCarrito(i);
  }

  borrarProducto2(i:number){
   this.arr_cantidad[i]=this.arr_cantidad[i]-1;
   this.compraService.borrarCantidad(i);
  }

  precioTotal(){
    this.precioT=0;
    for(let i = 0; i<this.carta.length; i++){ 
        if(this.carta[i] != null){
          this.precioT = this.precioT + (this.carta[i].PRECIO * this.arr_cantidad[i]);
        }  
    }
  }

  getIngredientePizza(){
    this.cartaService.getIngredientePizza().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.ingrediente.push(element);
      });
    });
  }

  getIngredienteEntrantes(){
    this.cartaService.getIngredienteEntrantes().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.ingrediente.push(element);
      });
    });
  }

  getPizza() {
    if (this.arr_carrito != null) {
      this.cartaService.getPizza().subscribe( (res: any) => {
         res.forEach((  element: any) => {
          var num = -1;
          this.arr_carrito.forEach((carrito: any) => {
            num++;
             if (carrito.substring(0, 1) == "p" && carrito.substring(1) ==  element.ID_PIZZA) {
              this.carta[num / 2] = element;
            }
          });
        });
      });
    }
  }

  getOfertas() {
    this.cartaService.getOferta().subscribe((res: any) => {
      res.forEach((element: any) => {
        var num = -1;
        this.arr_carrito.forEach((carrito: any) => {
          num++;
          if (carrito.substring(0, 1) == "o" && carrito.substring(1) == element.ID_OFERTA) {
            this.carta[num / 2] = element;
          }
        });
      });
    });
  }

  getEntrantes(){
    this.cartaService.getEntrantes().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        var num = -1;
        this.arr_carrito.forEach((carrito: any) => {
          num++;
          if (carrito.substring(0, 1) == "e" && carrito.substring(1) == element.ID_ENTRANTES) {
            this.carta[num / 2] = element;
          }
        });
      });
    });
  }

  getBebida(){
    this.cartaService.getBebida().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        var num = -1;
        this.arr_carrito.forEach((carrito: any) => {
          num++;
          if (carrito.substring(0, 1) == "b" && carrito.substring(1) == element.ID_BEBIDA) {
            this.carta[num / 2] = element;
          }
        });
      });
    });
  }

   getPostres(){
    this.cartaService.getPostres().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        var num = -1;
        this.arr_carrito.forEach((carrito: any) => {
          num++;
          if (carrito.substring(0, 1) == "x" && carrito.substring(1) == element.ID_POSTRES) {
            this.carta[num / 2] = element;
          }
        });
      });
    });
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
        }
      });
    }
  }



}
