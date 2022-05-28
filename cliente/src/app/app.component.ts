import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit, DoCheck{

  public title = "";
  public title_old = "algo";
  public isLogged:Boolean = true;
  public compra = 0;
  public carr_old='';
  public nombre = '';

  
  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  ngOnInit(){
    this.onCheckUser();
    this.checkUser();
  }

  ngDoCheck(): void {
    if (localStorage.getItem('carrito') != this.carr_old){
      this.compra = 0;
      this.contarCompra();
      const x = localStorage.getItem('carrito');
      if (x){
         this.carr_old = x;
      }
    }

    if(localStorage.getItem("ROL")!=this.title_old){
      this.checkUser();
      if(this.title!=''){
        this.title_old=this.title;
      }
      
    }
      
  }

  logOut(){
    localStorage.removeItem('ROL');
    localStorage.removeItem('token');
    localStorage.removeItem('NOMBRE');
    localStorage.removeItem('ID');
    this.router.navigate(['login']);
    this.title_old = "algo";
    this.checkUser();
   }


  onCheckUser():void{
    console.log("oncheckUser");
      if(this.authService.getCurrentUser()){
        this.isLogged = false;
      }else{this.isLogged = true;}
  }

  contarCompra(){
    const carr_sting = localStorage.getItem('carrito');
    var num = 0;
    if(carr_sting){
      var arr = carr_sting.split(",");
      arr.forEach(element => {
         if(num%2!=0 && element != ''){
           this.compra = this.compra + parseInt(element);
         }
          num++;
      });
    }
    else if (!carr_sting){this.compra = 0;}
  }

  checkUser(){
    const rol = localStorage.getItem("ROL");
    const nom = localStorage.getItem('NOMBRE');
    if(nom){
      this.nombre = nom;
    }
    
    if(rol){
      this.title = rol;
    }
    else if(!rol){
      this.title = '';
    }
  }

}

