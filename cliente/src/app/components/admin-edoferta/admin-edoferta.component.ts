import { Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin-edoferta',
  templateUrl: './admin-edoferta.component.html',
  styleUrls: ['./admin-edoferta.component.css']
})
export class AdminEdofertaComponent implements OnInit, DoCheck {

  public menu: FormGroup;

  menux={
    CARTA:'',
    NOMBRE: '',
    PRECIO: '',
    SIZE: '',
    IMAGEN: '',
    DESCRIPCION:'',
    INGREDIENTE: Array<string>()
  };
  
  public select_carta: string[]=[];
  public carta_old="";

  //@ViewChild('nuevo_plato') title: ElementRef ;

    constructor( private cartaService: CartaService, private renderer2: Renderer2)
    {
        this.menu = this.createFormGroup(); 
    }

   ngOnInit(): void {
     //console.log(this.menu);
      this.crearDiv();
      
    }
//esta siempre pendiente de los cambios que se producen en el input
    ngDoCheck(){
      if(this.menux.CARTA!=this.carta_old){
        this.selectCarta();
        this.carta_old = this.menux.CARTA;
      }
        
      
    }
  
    selectCarta(){
      
      if(this.menux.CARTA != ''){
        this.select_carta = [];
        this.cartaService.getCarta(this.menux.CARTA).subscribe((res:any) =>{
         // console.log( res);
          res.forEach((element: any) => {
            this.select_carta.push(element.NOMBRE);
          });
       });
        
      }
      
    }

    crearDiv (): void{
      // const nuevo_plato = this.title?.nativeElement;
       //nuevo_plato.renderer2.createElement('div');
      // nuevo_plato.renderer2.createText('hola mundo!');
    }
 
    onRegister(): void{
      //console.log(this.user);
      if(this.menu.valid){
        
        console.log('Valido');
        console.log(this.menu.value);
        console.log(this.menux.INGREDIENTE);
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
       this.menux.SIZE='';
       
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

      get SIZE(){
        const size = this.menu.get('SIZE');
        if(typeof(size)=="string"){
          this.menux.SIZE = size;
        };
          return size;
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
    
      get INGREDIENTE(){
        const ingrediente = this.menu.get('INGREDIENTE');
        if(typeof(ingrediente)=="string"){
          this.menux.INGREDIENTE = ingrediente;
        };
         return ingrediente;
        }
      
   
  }

function namespace(namespace: any, arg1: string) {
  throw new Error('Function not implemented.');
}
