import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit{

  title = 'cliente';
  public isLogged:Boolean = true;
    
  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  ngOnInit(){
    this.onCheckUser();
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

}

