import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CartaService} from 'src/app/services/carta.service'

@Component({
  selector: 'app-admin-edingrediente',
  templateUrl: './admin-edingrediente.component.html',
  styleUrls: ['./admin-edingrediente.component.css']
})
export class AdminEdingredienteComponent implements OnInit, DoCheck {

  public ingrediente: FormGroup;

  ing={
    NOMBRE: '',
    ALERGENO: '',
    IMAGEN: '',
    IMAGEN2: '',
    PRECIO: ''
  };
   
  public isChecked:boolean = false;
  public visible: boolean = false;
    constructor( private cartaService: CartaService)
    {
        this.ingrediente = this.createFormGroup(); 
      }
  
  
    ngOnInit(): void {
      console.log(this.ingrediente);
    }

    ngDoCheck(): void {
       console.log(this.isChecked);
       //this.isVisible();
    }
  
    isVisible(){
      
      if (this.visible ){
         this.visible = false;
       } else if (!this.visible ) {this.visible=true;}
    }
    onRegister(): void{
      //console.log(this.user);
      if(this.ingrediente.valid){
        /*
        console.log('Valido');
        console.log(this.ingrediente.value);
        console.log(this.ing);
        */
        this.cartaService.registerIngrediente(this.ingrediente.value).subscribe((res:any)=>{
           //console.log(res);
        });
        this.OnResetForm();
      }else{
        console.log('No valido');}
    
    }
     //se valida el input
    
     createFormGroup(){
       return new FormGroup({
       NOMBRE:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
       ALERGENO:new FormControl('', Validators.maxLength(40)),
       IMAGEN:new FormControl('',  Validators.maxLength(100)),
       IMAGEN2:new FormControl('',  Validators.maxLength(100)),
       PRECIO:new FormControl('',[ Validators.maxLength(6)])
       });
       
     }
   
     OnResetForm(){
       this.ingrediente.reset();
       this.ing.IMAGEN='';
       this.ing.IMAGEN2='';
       this.ing.NOMBRE='';
       this.ing.ALERGENO='';
       this.ing.PRECIO='';
     }
   
       
     get NOMBRE(){
       const nombre = this.ingrediente.get('NOMBRE');
       if(typeof(nombre)=="string"){
         this.ing.NOMBRE = nombre;
       };
       return nombre;
      }

     get ALERGENO(){
      const alergeno = this.ingrediente.get('ALERGENO');
      if(typeof(alergeno)=="string"){
        this.ing.NOMBRE = alergeno;
      };
        return alergeno;
      }

     get IMAGEN(){ 
      const imagen = this.ingrediente.get('IMAGEN');
      if(typeof(imagen)=="string"){
        this.ing.NOMBRE = imagen;
      };
       return imagen;
      }

      get IMAGEN2(){ 
        const imagen = this.ingrediente.get('IMAGEN2');
        if(typeof(imagen)=="string"){
          this.ing.NOMBRE = imagen;
      };
         return imagen;
      }
    

      get PRECIO(){
        return this.ingrediente.get('PRECIO');
      }
   
   
  }

