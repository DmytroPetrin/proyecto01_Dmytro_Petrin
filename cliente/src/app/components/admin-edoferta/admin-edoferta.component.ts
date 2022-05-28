
import {Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin-edoferta',
  templateUrl: './admin-edoferta.component.html',
  styleUrls: ['./admin-edoferta.component.css']
})
export class AdminEdofertaComponent implements OnInit, DoCheck {

  

  menux={
    CARTA: Array<string>(''),
    NOMBRE: '',
    PRECIO: '',
    IMAGEN: '',
    DESCRIPCION:''
    
  };
  
  public select_carta: any[0][0]=[''];
  public carta_old: string [] = [''];
 
  public isHidden: boolean= false;
  public oferta: any[]=[];
  public carta: any[]=[];
  public ingrediente: any[]=[];

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

   ngOnInit(): void {
     this.getOferta();
     console.log(this.oferta); 
     
    }
//esta siempre pendiente de los cambios que se producen en el input
  ngDoCheck() {
    if (this.menu.get('CARTA')) {
      const carta_val = this.menu.get('CARTA')?.value
      for (let i = 0; carta_val.length > i; i++) {
        if (carta_val[i] != this.carta_old[i]) {
          this.selectCarta(i);
          this.carta_old[i] = carta_val[i];
        }
      }
    }
    //console.log(this.menu.value);  
  }
    
 
    selectCarta(i: number){
      const carta_val = this.menu.get('CARTA')?.value
      const arr: string[]=[];
      if(carta_val[i] != '' && carta_val[i]){
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

    
 
  onRegister(): void {
    if (this.menu.valid) {

      this.cartaService.registerOferta(this.menu.value).subscribe({
        next: (res: any) => { },
        error: (err) => { console.log(err); },
        complete: () => {
          this.OnResetForm();
          this.getOferta();
        }
      });

    } else {
      console.log('No valido');
    }

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


  getOferta(){
    this.oferta = [];
    this.cartaService.getOferta().subscribe({
      next: (res:any)=>{
        res.forEach((element:any) =>{
            this.oferta.push(element);
        });
      },
      error: (err)=>{console.log(err);},
      complete: ()=>{this.getCartabyid();}
    });
  }

  getCartabyid() {
    this.carta = [];
    this.cartaService.getCartabyid().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          element.SIZE = element.TAMAÑO;
          this.carta.push(element);
        });
      },
      error: (err) => { console.log(err); },
      complete: () => {
        console.log(this.carta); 
        this.getIngredientebyid();
      }
    });
  }

  getIngredientebyid() {
    this.ingrediente = [];
    this.cartaService.getIngredientebyid().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.ingrediente.push(element);
        });
      },
      error: (err) => { console.log(err); },
      complete: () => {
        this.ajustarDatos();
        console.log(this.ingrediente);
      }
    });
  }


  ajustarDatos() {
    this.carta.forEach(element => {
      if (element.QUE == 'P') {
        var arr = new Array;
        for (let i = 0; i < this.ingrediente.length; i++) {
          var element2 = this.ingrediente[i];
          if (arr.length == 0 && element.ID == element2.ID && element2.PE == 'P') {
            arr.push(element2.IMAGEN);
          } else if (arr.length != 0 && element.ID == element2.ID && element2.PE == 'P') {
            arr.forEach(element3 => {
              if (element3 == element2.IMAGEN) {
                //console.log(element.ID);
                this.ingrediente[i].IMAGEN = '';
                this.ingrediente[i].ALERGENOS = '';
              } else {
                arr.push(element2.IMAGEN);
              }
            });
          }
        }
      }
      else if (element.QUE == 'E') {
        var arr = new Array;
        for (let i = 0; i < this.ingrediente.length; i++) {
          var element2 = this.ingrediente[i];
          if (arr.length == 0 && element.ID == element2.ID && element2.PE == 'E') {
            arr.push(element2.IMAGEN);
          } else if (arr.length != 0 && element.ID == element2.ID && element2.PE == 'E') {
            arr.forEach(element3 => {
              if (element3 == element2.IMAGEN) {
                //console.log(element.ID);
                this.ingrediente[i].IMAGEN = '';
                this.ingrediente[i].ALERGENOS = '';
              } else {
                arr.push(element2.IMAGEN);
              }
            });
          }
        }
      }

    });
  }

  borrarOferta(i:number){
    const ID = this.oferta[i].ID_OFERTA;
    const x = {CARTA: "oferta", ID: ID}
    this.cartaService.borrarCarta(x).subscribe({
      next: (res:any)=>{},
      error: (err)=>{console.log(err);},
      complete: ()=>{this.getOferta();}
    });
  }

  modificarOferta(i:number){ 
    this.menu.reset();
    const id = this.oferta[i].ID_OFERTA;
    console.log(this.menu.value.CARTA);
    const num = this.menu.value.CARTA.length
     for (let j = 0; j< num; j++){
      this.CARTA.removeAt(num - (j+1));
      this.CANTIDAD.removeAt(num - (j+1));
      this.NOMBRE_PLATO.removeAt(num - (j+1));
    }
    /*
    this.menu.controls['CARTA'].setValue([]);
    this.menu.controls['CANTIDAD'].setValue([]);
    this.menu.controls['NUEVO_PLATO'].setValue([]);
    */
   
    
    console.log(this.menu.value.CARTA);
    
    this.carta.forEach((element:any) =>{
      if(element.OFERTA == id){
        switch(element.QUE){
          case "P" : {
            this.CARTA.push(this.formBuilder.control('pizza'));
            break;
          }
          case "B" : {
            this.CARTA.push(this.formBuilder.control('bebida'));
            break;
          }
          case "E" : {
            this.CARTA.push(this.formBuilder.control('entrantes'));
            break;
          }
          case "PO" : {
            this.CARTA.push(this.formBuilder.control('postres'));
            break;
          }
        }
        this.CANTIDAD.push(this.formBuilder.control(element.CANTIDAD));
        this.NOMBRE_PLATO.push(this.formBuilder.control(element.NOMBRE));
      }
    });
    console.log(this.menu.value.CARTA);

    const date = new Date(this.oferta[i].FECHA_FIN);
    const mes = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    this.menu.controls['NOMBRE'].setValue(this.oferta[i].NOMBRE);
    this.menu.controls['PRECIO'].setValue(this.oferta[i].PRECIO);
    this.menu.controls['IMAGEN'].setValue(this.oferta[i].IMAGEN);
    this.menu.controls['DESCRIPCION'].setValue(this.oferta[i].DESCRIPCION);
    this.menu.controls['FECHA_FIN'].setValue(date.getFullYear() + '-' + mes[date.getMonth()] + '-' + date.getDate());
        
    this.onActivate();
    this.borrarOferta(i);         
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


 





