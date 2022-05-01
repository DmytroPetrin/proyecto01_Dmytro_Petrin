import { Component, OnInit, DoCheck} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-admin-edcarta',
  templateUrl: './admin-edcarta.component.html',
  styleUrls: ['./admin-edcarta.component.css']
})
export class AdminEdcartaComponent implements OnInit, DoCheck {

  public menu: FormGroup;
  public no_ingrediente = true;

  public pizza:any[] = [];
  public entrante: any[] = [];
  public ingredientePizza: any[] = [];
  public ingredienteEntrante: any[] = [];
  public bebida:any[]=[];
  public postre: any[] = [];
 

  menux={
    CARTA:'',
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

   ngOnInit(): void {
     //console.log(this.menu);
       this.getPizza();
       this.selectIngrediente();
       console.log(this.pizza);
       //console.log(this.ingredientePizza);
      
    }
//esta siempre pendiente de los cambios que se producen en el input
    ngDoCheck(): void {
       this.Noingrediente();
    }
  
    selectIngrediente(){
        this.cartaService.getIngrediente().subscribe((res:any)=>{
         
          res.forEach((element:{ID_INGREDIENTE:number, NOMBRE:string}) => {
           
            this.lista.push(element);
          });
        });
    }
 
    Noingrediente(){
      const carta = this.menux.CARTA;
      
        if (carta == "pizza" || carta == "entrantes"){
          this.no_ingrediente = false;
        }
        else {this.no_ingrediente = true;}
     // console.log('haciendo cosas...   '+this.no_ingrediente);

    }
   
    onRegister(): void{
      //console.log(this.user);
      if(this.menu.valid){
        
        console.log('Valido');
        console.log(this.menu.value);
        console.log(this.menux.INGREDIENTE);
        
        this.cartaService.registerCarta(this.menu.value).subscribe({
          next:(res:any)=>{},
          error:(err)=>{console.log(err);},
          complete:()=>{
            this.OnResetForm();
            this.getPizza();
          }
        });
        
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
      
   
        getPizza(){
          this.pizza = [];
          this.cartaService.getPizza().subscribe({
            next:(res:any)=>{
              res.forEach((element:any)=>{
                element.CARTA =  "pizza";
                this.pizza.push(element);
              });
            },
            error:(err)=>{console.log(err);},
            complete:()=>{
              this.getEntrante();
            }
          });
        }

        getEntrante(){
          this.entrante = [];
          this.cartaService.getEntrantes().subscribe({
            next:(res:any)=>{
              res.forEach((element:any)=>{
                element.CARTA = "entrantes";
                this.entrante.push(element);
              });
            },
            error:(err)=>{console.log(err);},
            complete:()=>{
              this.getIngrediente();
              this.getPostre();
            }
          });
        }

        getIngrediente(){
          this.ingredientePizza = [];
          this.ingredienteEntrante = [];
          this.cartaService.getIngredientePizza().subscribe({
            next:(res:any)=>{
              res.forEach((element:any)=>{
                this.ingredientePizza.push(element);
              });
            },
            error:(err)=>{console.log(err);},
            complete:()=>{}
          });

          this.cartaService.getIngredienteEntrantes().subscribe({
            next:(res:any)=>{
              res.forEach((element:any)=>{
                this.ingredienteEntrante.push(element);
              });
            },
            error:(err)=>{console.log(err);},
            complete:()=>{}
          });
        }

        getPostre(){
          this.postre = [];
          this.cartaService.getPostres().subscribe({
            next:(res:any)=>{
              res.forEach((element:any)=>{
                element.CARTA = "postres";
                this.postre.push(element);
              });
            },
            error:(err)=>{console.log(err);},
            complete:()=>{
              this.getBebida();
            }
          });
        }

        getBebida(){
          this.bebida = [];
          this.cartaService.getBebida().subscribe({
            next:(res:any)=>{
              res.forEach((element:any)=>{
                element.CARTA = "bebida";
                this.bebida.push(element);
              });
            },
            error:(err)=>{console.log(err);},
            complete:()=>{
              console.log(this.ingredientePizza);
            }
          });
        }

        borrarCarta(carta:string, i:number){
          var num = -1;
          switch(carta){
            case 'pizza':{
              num = this.pizza[i].ID_PIZZA;
              delete this.pizza[i];
              break;
            }
            case 'entrantes':{
              num = this.entrante[i].ID_ENTRANTES;
              delete this.entrante[i];
              break;
            }
            case 'bebida':{
              num = this.bebida[i].ID_BEBIDA;
              delete this.bebida[i];
              break;
            }
            case 'postres':{
              num = this.postre[i].ID_POSTRES;
              delete this.postre[i];
              break;
            }
          }
          const x={CARTA: carta, ID: num};
          this.cartaService.borrarCarta(x).subscribe({
            next:(res:any)=>{},
            error:(err)=>{console.log(err);},
            complete:()=>{
              switch(carta){
                case 'pizza':{
                  this.getPizza();
                  break;
                }
                case 'entrantes':{
                  this.getEntrante();
                  break;
                }
                case 'bebida':{
                  this.getBebida();
                  break;
                }
                case 'postres':{
                  this.getPostre();
                  break;
                }
              }
            }
          });
        }

        modificarCarta(carta:string, i:number){
          var nombre = '';
          var precio = -1;
          var size = '';
          var imagen = '';
          var descripcion = '';
          var ing = '';
          
          switch(carta){
            case 'pizza':{
              nombre = this.pizza[i].NOMBRE;
              precio = this.pizza[i].PRECIO;
              size = this.pizza[i].SIZE;
              imagen = this.pizza[i].IMAGEN;
              descripcion = this.pizza[i].DESCRIPCION;
              this.ingredientePizza.forEach(element=>{
                if(element.PIZZA==this.pizza[i].ID_PIZZA){
                  ing = ing + ',' + element.NOMBRE;
                }
              });
              console.log(this.menu.get('INGREDIENTE'));
              break;
            }
            case 'entrantes':{
              nombre = this.entrante[i].NOMBRE;
              precio = this.entrante[i].PRECIO;
              size = this.entrante[i].SIZE;
              imagen = this.entrante[i].IMAGEN;
              descripcion = this.entrante[i].DESCRIPCION;
              break;
            }
            case 'bebida':{
              nombre = this.bebida[i].NOMBRE;
              precio = this.bebida[i].PRECIO;
              size = this.bebida[i].SIZE;
              imagen = this.bebida[i].IMAGEN;
              descripcion = this.bebida[i].DESCRIPCION;
              break;
            }
            case 'postres':{
              nombre = this.postre[i].NOMBRE;
              precio = this.postre[i].PRECIO;
              size = this.postre[i].SIZE;
              imagen = this.postre[i].IMAGEN;
              descripcion = this.postre[i].DESCRIPCION;
              break;
            }
          } 
          this.menu.setValue({
            CARTA: carta,
            NOMBRE: nombre,
            PRECIO: precio,
            SIZE: size,
            IMAGEN: imagen,
            DESCRIPCION: descripcion,
            INGREDIENTE: ing
          });

          this.borrarCarta(carta, i);
          this.onActivate();
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


