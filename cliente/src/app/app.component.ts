import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit, DoCheck{

  title = 'cliente';
  public isLogged:Boolean = true;
  public compra = 0;
 
  public carr_old='';
  
  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  ngOnInit(){
    this.onCheckUser();
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
      
  }

  logOut(){
    const token = localStorage.getItem('token');
    if(token ){
      localStorage.removeItem('token');
      this.router.navigate(['home']);
      
    }else if(!token){
      this.router.navigate(['home']);
      
    }
 
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
}

