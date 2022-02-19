import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin-edcarta',
  templateUrl: './admin-edcarta.component.html',
  styleUrls: ['./admin-edcarta.component.css']
})
export class AdminEdcartaComponent implements OnInit {

  public menu: FormGroup;

  menux={
    NOMBRE: '',
    PRECIO: '',
    SIZE: '',
    IMAGEN: '',
    DESCRIPCION:'',
    INGREDIENTE: Array<string>()
  };
  
 
  

  lista:{ID_INGREDIENTE:number, NOMBRE:string}[] = [];
    constructor( private cartaService: CartaService)
    {
        this.menu = this.createFormGroup(); 
    }
  
    selectIngrediente(){
        this.cartaService.getIngrediente().subscribe((res:any)=>{
         
          res.forEach((element:{ID_INGREDIENTE:number, NOMBRE:string}) => {
           
            this.lista.push(element);
          });
        });
    }

    ngOnInit(): void {
     //console.log(this.menu);
      this.selectIngrediente();
    }
  
    onRegister(): void{
      //console.log(this.user);
      if(this.menu.valid){
        
        console.log('Valido');
        console.log(this.menu.value);
        console.log(this.menux.INGREDIENTE);
        
        this.cartaService.registerCarta(this.menu.value).subscribe((res:any)=>{
           //console.log(res);
        });
        this.OnResetForm();
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


