import { DOCUMENT } from '@angular/common';

import { AfterViewInit, Component, DoCheck, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin-edoferta',
  templateUrl: './admin-edoferta.component.html',
  styleUrls: ['./admin-edoferta.component.css']
})
export class AdminEdofertaComponent implements OnInit, DoCheck, AfterViewInit {

  public menu: FormGroup;

  menux={
    CARTA: Array<string>(''),
    NOMBRE: '',
    PRECIO: '',
    CANTIDAD: Array<string>(''),
    IMAGEN: '',
    DESCRIPCION:'',
    NOMBRE_PLATO: Array<string>('')
  };
  
  public select_carta: string[]=[];
  public carta_old: string[]=[''];

  /*
 @ViewChild('old') template: any;
 @ViewChild('new', {read:ViewContainerRef}) container: any;
 */
  

    constructor( private cartaService: CartaService,
       @Inject(DOCUMENT) private document: Document | any)
    {
        this.menu = this.createFormGroup(); 
         ;
    }

/*

 // What to clone
 @ViewChild('clone') template;

 // Where to insert the cloned content
 @ViewChild('container', {read:ViewContainerRef}) container;

 constructor(private resolver:ComponentFactoryResolver){}

 cloneTemplate(){
     this.container.createEmbeddedView(this.template);
 }
}
*/




    

    ngAfterViewInit(): void {
        
    }

   ngOnInit(): void {
     console.log(this.menux.CARTA);
      //this.crearDiv();
      
    }
//esta siempre pendiente de los cambios que se producen en el input
    ngDoCheck(){
      
      for(let i = 0; this.menux.CARTA.length > i; i++){
         
          if(this.menux.CARTA[i]!=this.carta_old[i]){
             this.selectCarta(i);
             this.carta_old[i] = this.menux.CARTA[i];
          }
      }
     
        
      
    }
  
    selectCarta(i: number){
      if(this.menux.CARTA[i] != ''){
        console.log('funcion selectCarta');
        this.select_carta = [];
        this.cartaService.getCarta(this.menux.CARTA[i]).subscribe((res:any) =>{
         // console.log( res);
          res.forEach((element: any) => {
            this.select_carta.push(element.NOMBRE);
          });
       });
        
      }
      
    }

    crearDiv (): void{
      const y = document.getElementById("old");
      if(y!=null){
        const clone = y.cloneNode(true);
        const x = document.getElementById("new");
        if(x != null){
            const z = clone.firstChild;
            if (z!=null){
              const zi = z.firstChild
              if(zi!=null){
                //zi.setAttribute("name", "helloButton");
              }
            }
            
            x.appendChild(clone) ;
            
      }
    } }

     //this.container.createEmbeddedView(this.template);
      /*
       const nuevo_plato = this.nuevoPlato.nativeElement;
       const selC =  this.selectC.nativeElement
       console.log(nuevo_plato);
       const p = this.renderer.createElement('div');
      this.renderer.appendChild(nuevo_plato, selC);
       //nuevo_plato.this.renderer.createText('hola mundo!');
       */
    
 
    onRegister(): void{
      //console.log(this.user);
      if(this.menu.valid){
        
        console.log('Valido');
        console.log(this.menu.value);
        
        /*
        this.cartaService.registerCarta(this.menu.value).subscribe((res:any)=>{
           //console.log(res);
        });
        this.OnResetForm();
        */
      }else{
        console.log('No valido');}
    
    }
     //se valida el input
    
     createFormGroup(){
       return new FormGroup({
       CARTA:new FormControl(''),  
       NOMBRE:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
       PRECIO:new FormControl('',[Validators.required, Validators.maxLength(6)]),
       SIZE:new FormControl('',[Validators.required, Validators.maxLength(20)]),
       IMAGEN:new FormControl('',  Validators.maxLength(100)),
       DESCRIPCION:new FormControl(''),
       INGREDIENTE: new FormControl('')
       
       });
       
     }
   
     OnResetForm(){
       this.menu.reset();
       this.menux.IMAGEN='';
       this.menux.NOMBRE='';
       this.menux.PRECIO='';
       this.menux.DESCRIPCION='';
       this.menux.CANTIDAD=[];
       
     }
   
       
     get NOMBRE(){
       const nombre = this.menu.get('NOMBRE');
       if(typeof(nombre)=="string"){
         this.menux.NOMBRE = nombre;
       };
       return nombre;
      }

     get PRECIO(){
      const precio = this.menu.get('PRECIO');
      if(typeof(precio)=="string"){
        this.menux.PRECIO = precio;
      };
        return precio;
      }
      
     get IMAGEN(){ 
      const imagen = this.menu.get('IMAGEN');
      if(typeof(imagen)=="string"){
        this.menux.IMAGEN = imagen;
      };
       return imagen;
      }

      get DESCRIPCION(){ 
        const  descripcion = this.menu.get('DESCRIPCION');
        if(typeof( descripcion)=="string"){
          this.menux.DESCRIPCION =  descripcion;
        };
         return descripcion;
        }

      get CARTA(){return this.menu.get('CARTA')}
    
      
  }






/*
function myFunction() {
  const node = document.getElementById("myList2");
  const clone = node.cloneNode(true);
  document.getElementById("myList1").appendChild(clone);
}
*/