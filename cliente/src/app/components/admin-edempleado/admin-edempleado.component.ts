import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-edempleado',
  templateUrl: './admin-edempleado.component.html',
  styleUrls: ['./admin-edempleado.component.css']
})
export class AdminEdempleadoComponent implements OnInit {

  public user: FormGroup;
  
  public empleado: any[] = [];
  

  constructor(private authService: AuthService)
  {
      this.user = this.createFormGroup(); 
    }


  ngOnInit(): void {
    this.getEmpleado();
    console.log(this.empleado);
  }

  onRegister(): void{
    if(this.user.valid){
      this.authService.registerEmpleado(this.user.value).subscribe({
        next:(res:any)=>{},
        error:(err)=>{console.log(err);},
        complete:()=>{
          this.OnResetForm();
          this.getEmpleado();
        }
      });
    }else{
      console.log('No valido');}
  }


   //se valida el input
   private emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
   private passPattern =/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)[A-Za-z\d!$%@#£ñÑ€*?&]{8,40}$/gm;
   private dniPattern = /^((\d{8})|([A-z]{1}(\d{7})))([A-z])$/;
   createFormGroup(){
     return new FormGroup({
     NOMBRE:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
     APELLIDO:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
     EMAIL:new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.emailPattern)], this.miValidator.bind(this)),  
     PASS:new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern(this.passPattern)]) ,
     TELEFONO:new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
     FECHA_ALTA:new FormControl(''),
     DIRECCION:new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
     DNI:new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.dniPattern)]),
     ROL: new FormControl('')
     });
     
   }
 
   OnResetForm(){
     this.user.reset();
   }
 
   async miValidator(control:AbstractControl){
     const value = control.value;
     
     const data = await this.authService.comprobarUsuario(value);
     
     if(data){
       console.log(data);
       return {notAvailable : true};
     }else{
       console.log(data);
       return null;
     }
 
   }
      
 
   get NOMBRE(){ return this.user.get('NOMBRE');}
   get APELLIDO(){ return this.user.get('APELLIDO');}
   get EMAIL(){ return this.user.get('EMAIL');}
   get PASS(){ return this.user.get('PASS');}
   get TELEFONO(){ return this.user.get('TELEFONO');}
   get FECHA_ALTA(){ return this.user.get('FECHA_NACIMIENTO');}
   get DIRECCION(){ return this.user.get('DIRECCION');}
   get DNI(){ return this.user.get('DNI');}
   get ROL(){ return this.user.get('ROL');}

   getEmpleado(){
     this.empleado = [];
     this.authService.getEmpleado().subscribe((res:any) =>{
       res.forEach((element:any) => {
        element.PASS = element.CONTRASEÑA;
         console.log(element);
         this.empleado.push(element);
       });
     });
   }

   borrarEmpleado(i:number){
     this.authService.borrarEmpleado(this.empleado[i].EMAIL).subscribe();
     var arr = new Array;
     for(let j = 0; j < this.empleado.length; j++){
       if(i!=j){
         arr.push(this.empleado[j]);
       }
     }
     this.empleado = arr;
   }

   modificarEmpleado(i:number){
       const arr = this.empleado[i];
       this.borrarEmpleado(i);
       const date = new Date(arr.FECHA_ALTA);
       const mes = ['01','02','03','04','05','06','07','08','09','10','11','12']
       this.user.setValue({
         NOMBRE: arr.NOMBRE,
         APELLIDO: arr.APELLIDO,
         EMAIL: arr.EMAIL,
         PASS: arr.PASS,
         TELEFONO: arr.TELEFONO,
         FECHA_ALTA: date.getFullYear() + '-' + mes[date.getMonth()] + '-' + date.getDate(),
         DIRECCION: arr.DIRECCION,
         DNI: arr.DNI,
         ROL: arr.ROL
        });
        
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
 

