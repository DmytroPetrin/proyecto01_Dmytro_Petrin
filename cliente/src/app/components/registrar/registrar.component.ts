import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public user: FormGroup;

  constructor(private authService: AuthService)
  {
      this.user = this.createFormGroup(); 
    }

    /*
  public user = {
    NOMBRE:'',
    APELLIDO:'',
    EMAIL: '',
    PASS: '',
    TELEFONO:'',
    FECHA_NACIMIENTO:'',
    DIRECCION:''
  }
*/
 

  ngOnInit(): void {
  }

  onRegister(): void{
    //console.log(this.user);
    if(this.user.valid){
      //this.OnResetForm();
      
      console.log('Valido');
      //console.log(this.user.value);
      this.authService.registerUser(this.user.value).subscribe((res:any)=>{
         //console.log(res);
      });
    }else{
      console.log('No valido');}
  
  }

  //se valida el input
  private emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private passPattern =/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)[A-Za-z\d!$%@#£ñÑ€*?&]{8,40}$/gm;
  createFormGroup(){
    return new FormGroup({
    NOMBRE:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    APELLIDO:new FormControl('', Validators.maxLength(40)),
    EMAIL:new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.emailPattern)], this.miValidator.bind(this)),  
    PASS:new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern(this.passPattern)]) ,
    TELEFONO:new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    FECHA_NACIMIENTO:new FormControl(''),
    DIRECCION:new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)])
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
  get FECHA_NACIMIENTO(){ return this.user.get('FECHA_NACIMIENTO');}
  get DIRECCION(){ return this.user.get('DIRECCION');}

}
