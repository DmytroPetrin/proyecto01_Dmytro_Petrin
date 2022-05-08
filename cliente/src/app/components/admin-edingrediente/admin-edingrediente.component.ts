import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  public arr_ingrediente:any[] = [];
  public arr_extra:any[] = [];
  public arr_ing_ex:boolean[] = [];
  public visible: boolean = false;


  ing={
    NOMBRE: '',
    ALERGENO: '',
    IMAGEN: '',
    IMAGEN2: '',
    PRECIO: ''
  };
   
    constructor( private cartaService: CartaService)
    {
        this.ingrediente = this.createFormGroup(); 
      }
  
  
    ngOnInit(): void {
      
      this.getExtra();
      console.log(this.arr_ingrediente);
      console.log(this.arr_extra);
      console.log(this.arr_ing_ex);
    }

    ngDoCheck(): void {
       //console.log(this.isChecked);
       //this.isVisible();
    }

   
    isVisible($event: any){
      this.visible = $event.target.checked;
    }


    onRegister(): void{
      //console.log(this.user);
      if(this.ingrediente.valid){
        this.cartaService.registerIngrediente(this.ingrediente.value).subscribe({
          next: (res: any) => {
            //console.log(res);
          },
          error: (err) => { console.log(err); },
          complete: () => {
            if (this.visible && this.ingrediente.value.IMAGEN2 && this.ingrediente.value.PRECIO) {
              this.cartaService.registerExtra(this.ingrediente.value).subscribe({
                next:(res:any)=>{},
                error:(err)=>{console.log(err);},
                complete:()=>{
                 
                }
            });
            }
            this.OnResetForm();
            this.getExtra();
          }
        });
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
   
   
  getIngrediente() {
    this.arr_ingrediente = [];  
    this.arr_ing_ex = [];
    this.cartaService.getIngrediente().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.arr_ingrediente.push(element);
          this.arr_ing_ex.push(true);
          this.arr_extra.forEach(element2 => {
            if (element.ID_INGREDIENTE == element2.INGREDIENTE) {
              this.arr_ing_ex[this.arr_ing_ex.length-1] = false;
            } 
          });
        });
      },
      error: (err: any) => { console.log(err); },
      complete: () => { }
    });
  }

      getExtra(){
        this.arr_extra = [];
        this.cartaService.getExtra().subscribe({
          next: (res:any)=>{
            res.forEach((element:any)=>{
              this.arr_extra.push(element);
            });
          },
          error: (err)=>{console.log(err);},
          complete:() =>{this.getIngrediente();}
        });
      }

      modificarIngrediente(i:number){
        this.visible = true;
        const arr = this.arr_ingrediente[i];
        var arrEx; 
        this.arr_extra.forEach(element =>{
           if(element.INGREDIENTE == arr.ID_INGREDIENTE){
             arrEx = element;
            }
        });
        if(!arrEx){
          arrEx = {IMAGEN: '', PRECIO: ''}
        }
        this.ingrediente.setValue({
          NOMBRE: arr.NOMBRE,
          ALERGENO: arr.ALERGENOS,
          IMAGEN: arr.IMAGEN,
          IMAGEN2: arrEx.IMAGEN,
          PRECIO: arrEx.PRECIO
        });
        this.borrarIngrediente(i);
        this.onActivate();
      }

      borrarIngrediente(i:number){
        const ID = this.arr_ingrediente[i];
        delete this.arr_ingrediente[i];
        this.cartaService.borrarIngrediente(ID).subscribe();
        
      }

      onActivate() {
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 200); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
      }

  }

