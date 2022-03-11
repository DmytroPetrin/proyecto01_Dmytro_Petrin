
import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin-edoferta',
  templateUrl: './admin-edoferta.component.html',
  styleUrls: ['./admin-edoferta.component.css']
})
export class AdminEdofertaComponent implements OnInit, DoCheck, AfterViewInit {

  

  menux={
    CARTA: Array<string>(''),
    NOMBRE: '',
    PRECIO: '',
    IMAGEN: '',
    DESCRIPCION:''
    
  };
  
  public select_carta: any[0][0]=[''];
  public carta_old: string [] = [''];
  public html_cod: string= '';
  public isHidden: boolean= false;

  public menu: FormGroup;
 

    constructor( private cartaService: CartaService,
      private formBuilder: FormBuilder
       )
    {
        this.menu = this.formBuilder.group({
          CARTA:this.formBuilder.array([ this.formBuilder.control('', Validators.required)]), 
          NOMBRE:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
          PRECIO:new FormControl('',[Validators.required, Validators.maxLength(6)]),
          CANTIDAD:this.formBuilder.array([ this.formBuilder.control('', Validators.required)]),
          IMAGEN:new FormControl('',  Validators.maxLength(100)),
          DESCRIPCION:new FormControl(''),
          FECHA_FIN: new FormControl(''),
          NOMBRE_PLATO: this.formBuilder.array([ this.formBuilder.control('', Validators.required)])
        });
         
    }




    ngAfterViewInit(): void {
        
    }

   ngOnInit(): void {
     //console.log(this.menux.CARTA);
      //this.crearDiv();
      
    }
//esta siempre pendiente de los cambios que se producen en el input
    ngDoCheck(){
      const carta_val = this.menu.get('CARTA')?.value
      for(let i = 0; carta_val.length > i; i++){
      
          if(carta_val[i]!=this.carta_old[i]){
           
             this.selectCarta(i);
             this.carta_old[i] = carta_val[i];
          }
      }
     
      //console.log(this.menu.value);  
      
    }
    
 
    selectCarta(i: number){
      const carta_val = this.menu.get('CARTA')?.value
      const arr: string[]=[];
      if(carta_val[i] != ''){
       this.select_carta[i]=arr;
        this.cartaService.getCarta(carta_val[i]).subscribe((res:any) =>{
         //console.log( res);
          res.forEach((element: any) => {
            arr.push(element.NOMBRE);
            
          });
       });
       for (let j= 0; arr.length<j; j++){
         this.select_carta[i][j] =arr[j];
       }
      }
     }

    
    crearDiv (){
      
       this.CARTA.push(this.formBuilder.control(''));
       this.CANTIDAD.push(this.formBuilder.control(''));
       this.NOMBRE_PLATO.push(this.formBuilder.control(''));
       this.carta_old.push('');
    
    }
     
    deleteDiv (index: number){
      this.CARTA.removeAt(index);
      this.CANTIDAD.removeAt(index);
      this.NOMBRE_PLATO.removeAt(index);

    }

    
 
    onRegister(): void{
      //console.log(this.user);
      if(this.menu.valid){
        
        console.log('Valido');
        console.log(this.menu.value);
        
        
        this.cartaService.registerOferta(this.menu.value).subscribe((res:any)=>{
           console.log(res);
        });
        this.OnResetForm();
       
      }else{
        console.log('No valido');}
    
    }
     
   
     OnResetForm(){
       this.menu.reset();
       this.menux.IMAGEN='';
       this.menux.NOMBRE='';
       this.menux.PRECIO='';
       this.menux.DESCRIPCION='';
       
       
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

        get FECHA_FIN() {
          const  fecha_fin = this.menu.get('FECHA_FIN');
          if(typeof( fecha_fin)=="string"){
             this.menux.DESCRIPCION =  fecha_fin;
        };
         return fecha_fin;

        }

     // get CARTA(){return this.menu.get('CARTA')}
    
      get CARTA(){ 
        return this.menu.get('CARTA') as FormArray}

      get CANTIDAD(){ 
        return this.menu.get('CANTIDAD') as FormArray}

      get NOMBRE_PLATO(){ 
        return this.menu.get('NOMBRE_PLATO') as FormArray}
  }






/*
function myFunction() {
  const node = document.getElementById("myList2");
  const clone = node.cloneNode(true);
  document.getElementById("myList1").appendChild(clone);
}
*/