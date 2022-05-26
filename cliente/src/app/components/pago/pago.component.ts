import { compileClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  //variable para botones
  public tarjeta = true;
  public efectivo = false;
  public domicilio = true;
  public recoger = false;

  //variable datos de BD
  public compra: any[] = [];
  public listaOferta : any[] = [];
  public mod: any[] = [];
  public modNum: number[] = [0]; //diferencia productos iguales(extras)
  public cmodNum: number[] = [];
  public arr_mod: any[] = [];

  public precioTotal = 0;
  public direccion = '';

  constructor(private compraService: CompraService, private router: Router) { }

  ngOnInit(): void {
    this.getCompra();
    this.getDireccion();
    console.log(this.compra);
    console.log(this.listaOferta);
    console.log(this.mod);
    console.log(this.modNum);
    console.log(this.cmodNum);
    console.log(this.arr_mod);
  }

  //logica de los botones
  tarjetaPago($event: any){
    if(!this.tarjeta){
      this.tarjeta = $event.target.checked;
      this.efectivo = false;
    }
  }

  efectivoPago($event: any){
    if(!this.efectivo){
      this.efectivo = $event.target.checked;
      this.tarjeta = false;
    }
   }

   aDomicilio($event: any){
     if(!this.domicilio){
       this.domicilio = $event.target.checked;
       this.recoger = false;
     }
   }

   aRecoger($event: any){
     if(!this.recoger){
       this.recoger = $event.target.checked;
       this.domicilio = false;
     }
   }

   getDireccion(){
     const x = localStorage.getItem('DIRECCION');
     if(x){
       this.direccion = x;
     }
   }

   //PARA PODER VISUALIZAR EL PRODUCTO TANTAS VECES COMO PONE EN CANTIDAD
   counter(i: number) {
      return new Array(i);
   } 

   //para poder trabajar con numMod
   convertirNumMod(){
       for(let i = 0; i<this.modNum.length; i++){
         if(i == 0){
           this.cmodNum.push(this.modNum[i]);
         } else{
          this.cmodNum.push(this.cmodNum[i-1] + this.modNum[i]);
         }
      }
      //se crea array especial para poder diferenciar productos iguales
      var rarr = new Array;
      this.compra.forEach(element =>{
        var num = -1;
        var x = 0;
        
         for(let i = 0; i<element.CANTIDAD; i++){
           for(let j = 0; j< this.mod.length; j++){
             if(rarr.length != this.mod.length){
               rarr.push(0);
             }
             if(element.QUE == 'P'){
               if(element.ID == this.mod[j].PIZZA){
                 if(this.mod[j].NUM_MOD || this.mod[j].NUM_MOD == 0){
                   if(num == -1){
                       num = this.mod[j].NUM_MOD;
                       x = num - i
                   }
                   if(j < this.cmodNum[this.mod[j].NUM_MOD] && this.mod[j].NUM_MOD - i == x){ 
                     this.arr_mod.push([null, element.ID, null, i, j, this.mod[j].NUM_MOD]);
                     rarr[j]=1;
                   }
                 }
               }
             }
             if(element.QUE == 'E'){
              if(element.ID == this.mod[j].ENTRANTES){
                if(this.mod[j].NUM_MOD || this.mod[j].NUM_MOD == 0){ 
                  if(num == -1){
                      num = this.mod[j].NUM_MOD;
                      x = num - i
                  }
                  if(j < this.cmodNum[this.mod[j].NUM_MOD] && this.mod[j].NUM_MOD - i == x){ 
                    this.arr_mod.push([null, null, element.ID, i, j, this.mod[j].NUM_MOD]);
                    rarr[j]=1;
                  }
                }
              }
            }
             if (element.QUE == 'O') {
               if (element.ID == this.mod[j].OFERTA) {
                 if (this.mod[j].NUM_MOD || this.mod[j].NUM_MOD == 0) {
                    if (j < this.cmodNum[this.mod[j].NUM_MOD] && rarr[j] == 0) {
                      
                      this.arr_mod.forEach(am =>{

                        if((am[3]==i) && (am[4]!=j) && (am[5]==this.mod[j].NUM_MOD) && (am[0]==element.ID) && rarr[j] == 0){
                          this.arr_mod.push([element.ID, this.mod[j].PIZZA, this.mod[j].ENTRANTES, i, j, this.mod[j].NUM_MOD]);
                          rarr[j]=1;
                        }
                        
                        else if((am[3]==i) && (am[4]!=j) && (am[5]!=this.mod[j].NUM_MOD) && (am[1]!=this.mod[j].PIZZA)&& am[1] && this.mod[j].PIZZA && (am[0]==element.ID) && rarr[j] == 0){
                          this.arr_mod.push([element.ID, this.mod[j].PIZZA, this.mod[j].ENTRANTES, i, j, this.mod[j].NUM_MOD]);
                          rarr[j]=1;
                        }
                        else if((am[3]==i) && (am[4]!=j) && (am[5]!=this.mod[j].NUM_MOD) && (am[2]!=this.mod[j].ENTRANTES) && am[2] && this.mod[j].ENTRANTES && (am[0]==element.ID) && rarr[j] == 0){
                          this.arr_mod.push([element.ID, this.mod[j].PIZZA, this.mod[j].ENTRANTES, i, j, this.mod[j].NUM_MOD]);
                          rarr[j]=1;
                        }
                        else if((am[3]!=i) && (am[4]!=j) && (am[5]!=this.mod[j].NUM_MOD) && (am[0]==element.ID) && rarr[j] == 0){
                          this.arr_mod.push([element.ID, this.mod[j].PIZZA, this.mod[j].ENTRANTES, i, j, this.mod[j].NUM_MOD]);
                          rarr[j]=1;
                          //console.log('funck'+ i +" "+ j + " " +am[1]+" "+this.mod[j].NUM_MOD);
                          //console.log(rarr);
                        }
                        else if((am[0]!=element.ID) && (am[4]!=j) && (am[5]!=this.mod[j].NUM_MOD) && (rarr[j] == 0) && (x == 0)){
                          this.arr_mod.push([element.ID, this.mod[j].PIZZA, this.mod[j].ENTRANTES, i, j, this.mod[j].NUM_MOD]);
                          rarr[j]=1;
                          x++;
                        }
                        
                      });
                         if(this.arr_mod.length == 0){
                          this.arr_mod.push([element.ID, this.mod[j].PIZZA, this.mod[j].ENTRANTES, i, j, this.mod[j].NUM_MOD]);
                          rarr[j]=1;
                         }
                       }
                    
                  


                 }
               }
             }
           }
         }
      });
   }
   
   //se obtienen datos de la base de datos
   getCompra(){
     const compra = localStorage.getItem('compra');
     if(compra){
       const x = {ID: parseInt(compra)}
         this.compraService.getCompra(x).subscribe({
           next: (res: any)=>{
             res.forEach((element:any) => {
               this.compra.push(element);
             });
           },
           error: (err)=>{console.log(err);},
           complete: () =>{
             this.compraService.getPrecioT(x).subscribe({
              next: (res: any)=>{
                this.precioTotal = res[0].PRECIO;
              },
              error: (err)=>{console.log(err);},
              complete: () =>{
                this.compraService.getModificado(x).subscribe({
                   next: (res: any)=>{
                     res.forEach((element:any)=>{
                       this.mod.push(element);
                       if(element.NUM_MOD || element.NUM_MOD == 0){
                         if(!this.modNum[element.NUM_MOD]){      //console.log('si no existe modnum '+element.NUM_MOD);
                           this.modNum[element.NUM_MOD]= 1;
                         }else if(this.modNum[element.NUM_MOD]){  //console.log('si existe mod num: '+element.NUM_MOD);
                           this.modNum[element.NUM_MOD]++
                         }
                        }
                     });
                   },
                   error: (err)=>{console.log(err);},
                   complete: () =>{
                     this.compraService.getListaOferta(x).subscribe({
                      next: (res: any)=>{
                        res.forEach((element:any)=>{
                          this.listaOferta.push(element);
                        })
                      },
                      error: (err)=>{console.log(err);},
                      complete: () =>{
                        this.convertirNumMod();
                      }
                     });
                   }
              });
              }
             });
           }
         });
     }
   }

   guardarPago(){
     const compra = localStorage.getItem('compra');
     if(compra){
       const pago = {
         COMPRA: parseInt(compra), 
         TARJETA: this.tarjeta, 
         EFECTIVO: this.efectivo, 
         RECOGIDA: this.recoger
        }
       this.compraService.guardarPago(pago).subscribe({
         next: (res:any)=>{},
         error: (err)=>{console.log(err);},
         complete: ()=>{
           localStorage.setItem('compra', '');
           localStorage.setItem('carrito', '');
           this.router.navigate(['/private/gracias']);
         }
       });
     }
   }

}
