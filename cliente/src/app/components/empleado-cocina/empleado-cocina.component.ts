import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-empleado-cocina',
  templateUrl: './empleado-cocina.component.html',
  styleUrls: ['./empleado-cocina.component.css']
})
export class EmpleadoCocinaComponent implements OnInit {

  
  //variable datos de BD
  public compra: any[] = [];
  public listaOferta : any[] = [];
  public mod: any[] = [];
  public modNum: number[] = [0]; //diferencia productos iguales(extras)
  public cmodNum: number[] = [];
  public arr_mod: any[] = [];

  public pedido: any[]=[];
  public todo: any[] = [];
  
  public ultimo_pedido = 0;
  public n = 0;
  

  //timer
  public time: number = 0;
  public interval: any;

  constructor(private compraService: CompraService, private router: Router) { }

  ngOnInit(): void {
    this.getPedido();
    this.startTimer();
    //this.alarma();
    console.log(this.pedido);
    console.log(this.compra);
    console.log(this.listaOferta);
    console.log(this.mod);
    console.log(this.modNum);
    console.log(this.cmodNum);
    console.log(this.arr_mod);
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
      var mod1 = new Array;
      this.mod.forEach(element=>{
        mod1.push(element);
      });

      var arr = new Array;
      this.compra.forEach(element =>{
        var num = -1;
        var x = 0;
        var control = -1;
        
         for(let i = 0; i<element.CANTIDAD; i++){
           control = -1;
           
           for(let j = 0; j< mod1.length; j++){
             if(rarr.length != mod1.length){
               rarr.push(0);
             }
             if(element.QUE == 'P'){
               if(mod1[j] && element.ID == mod1[j].PIZZA && !mod1[j].OFERTA){
                 if(mod1[j].NUM_MOD || mod1[j].NUM_MOD == 0){
                   if(control==-1){
                      control=mod1[j].NUM_MOD;
                   }
                   
                   if((j < this.cmodNum[mod1[j].NUM_MOD]) && (control==mod1[j].NUM_MOD)  && (rarr[j] == 0) ){ 
                     this.arr_mod.push([null, element.ID, null, i, j, mod1[j].NUM_MOD]);
                     rarr[j]=1;
                     delete mod1[j];
                   }
                 }
               }
             }

             if(element.QUE == 'E'){
              if(mod1[j] && element.ID == mod1[j].ENTRANTES && !mod1[j].OFERTA){
                if(mod1[j].NUM_MOD || mod1[j].NUM_MOD == 0){ 
                  if(control==-1){
                    control=mod1[j].NUM_MOD;
                 }
                  if((j < this.cmodNum[mod1[j].NUM_MOD]) && (control==mod1[j].NUM_MOD) && (rarr[j] == 0)){ 
                    this.arr_mod.push([null, null, element.ID, i, j, mod1[j].NUM_MOD]);
                    rarr[j]=1;
                    delete mod1[j];
                  }
                }
              }
            }
             if (element.QUE == 'O') {
               if (mod1[j] && element.ID == mod1[j].OFERTA) {
                 if (mod1[j].NUM_MOD || mod1[j].NUM_MOD == 0) {
                    if (j < this.cmodNum[mod1[j].NUM_MOD] && rarr[j] == 0) {
                      
                      //true significa que es distinto
                      var id = true;
                      var posicion = true;
                      var posicion2 = false;
                      var nuM = true;
                      var nuM2 = false;
                      var p = true;
                      var e = true;
                      var p1 = true;
                      var e1 = true;
                      var rep = true
                      this.arr_mod.forEach(am => {
                        //interrumpo el bucle
                        if (rep) {
                          //si existe mismo id
                          if (am[0] == element.ID) {
                            id = false;
                            //si es misma oferta
                            if (am[3] == i) {
                              posicion = false;
                              //si es mismo num_mod
                              if (am[5] == mod1[j].NUM_MOD) {
                                nuM = false;
                                //si es misma idPizza o idEntrante
                                if (((am[1] == mod1[j].PIZZA) && am[1] && mod1[j].PIZZA)) {
                                  p = false;
                                  p1=true;
                                  rep = false;
                                }
                                else if (((am[2] == mod1[j].ENTRANTES) && am[2] && mod1[j].ENTRANTES)) {
                                  e = false;
                                  e1=true;
                                  rep = false;
                                }
                              }
                              // si es disitino num_mod
                              if (am[5] != mod1[j].NUM_MOD) {
                                nuM2 = true;
                                nuM = false;
                                //si es misma idPizza o idEntrante
                                if (((am[1] == mod1[j].PIZZA) && am[1] && mod1[j].PIZZA)) {
                                  p1 = false;
                                  p = true;
                                  rep = false;
                                }
                                else if (((am[2] == mod1[j].ENTRANTES) && am[2] && mod1[j].ENTRANTES)) {
                                  e1 = false;
                                  e = true;
                                  rep = false;
                                }
                              }
                            }
                            //si es distinta oferta
                            else if(am[3] != i) {
                              posicion2 = true;
                              rep = false;
                            }
                          }
                          //console.log('id: '+  element.ID + " pizza: "+mod1[j].PIZZA+ id + posicion + nuM+p+e);
                        }

                      });
                      
                      
                      //id totalmente distinto
                      if (id && posicion && nuM && (p || e)) {
                        this.arr_mod.push([element.ID, mod1[j].PIZZA, mod1[j].ENTRANTES, i, j, mod1[j].NUM_MOD]);
                        arr.push([element.ID, mod1[j].PIZZA, mod1[j].ENTRANTES, i, j, mod1[j].NUM_MOD]);
                        rarr[j] = 1;
                        delete mod1[j];
                        
                      }
                       
                      //mismo id misma oferta mismo numod y misma pizza o entrante
                      else if (!id && !posicion && !nuM && (!p || !e) && (p1||e1)) {
                        this.arr_mod.push([element.ID, mod1[j].PIZZA, mod1[j].ENTRANTES, i, j, mod1[j].NUM_MOD]);
                        arr.push([element.ID, mod1[j].PIZZA, mod1[j].ENTRANTES, i, j, mod1[j].NUM_MOD]);
                        rarr[j] = 1;
                        delete mod1[j];
                      }
                      
                      //mismo id misma posicion distinto num_mod
                      else if (!id && !posicion && nuM2 ) {
                        this.arr_mod.push([element.ID, mod1[j].PIZZA, mod1[j].ENTRANTES, i, j, mod1[j].NUM_MOD]);
                        arr.push([element.ID, mod1[j].PIZZA, mod1[j].ENTRANTES, i, j, mod1[j].NUM_MOD]);
                        rarr[j] = 1;
                        delete mod1[j];
                      }

                      
                       }
                     }
               }
             }
           }
         }
      });
     //ultimo ajuste
     
     var n = 0;
     while (n == 0) {
       n = 1;
       arr.forEach(aa => {
         for (let r = 0; r < this.arr_mod.length; r++) {
           var bb = this.arr_mod[r];
           if (aa[0] && bb[0] && aa[0] == bb[0] && aa[1] == bb[1] && aa[2] == bb[2] && aa[3] == bb[3] && aa[5] > bb[5]) {
              this.arr_mod[r][3]++;
                   arr[r][3]++;
                   n = 0;
            }
         }
       });
     }
   }

   //SACO TODOS LOS PEDIDOS
   getPedido(){
     var new_pedido = new Array;
     var old = false;
     var nuevo = false;
     this.compraService.getPedido().subscribe({
       next: (res: any) => {
         if (this.pedido.length == 0) {
           res.forEach((element: any) => {
             this.pedido.push(element);
             old = true;
            });

         } else {
           res.forEach((element: any) => {
             new_pedido.push(element);
             nuevo = true;
           });
         }
       }, 
       error: (err)=>{console.log(err);},
       complete: ()=>{
         if (nuevo && new_pedido[0].COMPRA != this.ultimo_pedido) {
           this.alarma();
           this.ultimo_pedido = new_pedido[0].COMPRA;
           var ar = new Array;
           for(let j = 0; j < new_pedido.length - this.pedido.length; j++){
             ar.push(new_pedido[j]);
           }
           new_pedido = ar;
           for (let i = new_pedido.length - 1; i > -1; i--) {
             this.pedido.unshift(new_pedido[i]);
           }
           this.getCompra(this.pedido[0].COMPRA, true);
         }
         else if (old) {
           this.ultimo_pedido = this.pedido[0].COMPRA;
           this.getCompra(this.pedido[0].COMPRA, false);
         }
        
       }
     });
   }

//timer
   
  startTimer() {
    this.interval = setInterval(() => {
      if (this.time = 0) {
        this.time++;
      } else {
        this.time = 0;
        console.log('es tiempo');
       // console.log(this.pedido);
        //console.log(this.ultimo_pedido);
        //this.alarma();
        this.getPedido();
      }
    }, 5000);
  }

  //alarma de pedido nuevo
  alarma(){
   let audio = new Audio();
   audio.src = "http://127.0.0.1:8081/sound/alarma3.mp3";
   audio.load();
   audio.play();
  }


   //funcion asincrona
   asyncrono(compra: number, nw:boolean){
     for(let i = 0; i<this.pedido.length; i++){
       if(this.pedido[i].COMPRA == compra && this.pedido[i+1] && !this.todo[i+1] ){
          this.getCompra(this.pedido[i+1].COMPRA, nw);
       }
     }

   }
   
   //metodo todos los datos en un array
  empaquetarDatos(compra: number, nw: boolean){
    if(nw){
      this.todo.unshift([this.compra, this.listaOferta, this.mod, this.modNum, this.cmodNum, this.arr_mod, compra]);
    } else{
      this.todo.push([this.compra, this.listaOferta, this.mod, this.modNum, this.cmodNum, this.arr_mod, compra]);
    }
    
    this.compra = [];
    this.listaOferta = [];
    this.mod = [];
    this.modNum = [0]; 
    this.cmodNum = [];
    this.arr_mod = [];
    //this.asyncrono(compra);
  }


   //se obtienen datos de la base de datos
   getCompra(compra: number, nw: boolean){
     
     if(compra){
       const x = {ID: compra}
         this.compraService.getCompra(x).subscribe({
           next: (res: any)=>{
             res.forEach((element:any) => {
               element.COMPRA = compra;
               this.compra.push(element);
             });
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
                        this.empaquetarDatos(compra, nw);
                        this.asyncrono(compra, nw);
                        console.log(this.todo);
                      }
                     });
                   }
              });
           }
         });
     }
   }

}
