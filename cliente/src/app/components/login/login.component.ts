import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



 export class LoginComponent implements OnInit {

  user = {
    EMAIL: '',
    PASS: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router, 
    private appComponente: AppComponent
    ) { } 

  ngOnInit(): void {
  }

  logIn(){
    //console.log(this.user);
    this.authService.signin(this.user).subscribe((res:any)=>{
      //console.log(res);
      localStorage.setItem('token', res.token);
     // this.router.navigate(['private']); //para poder navegar a la pagina private
      
    });
    
    
   
  }
  
  panel(){
     this.router.navigate(['admin']);
     (<HTMLInputElement>document.getElementById('salir')).style.display="block"; 
     (<HTMLInputElement>document.getElementById('admin')).style.display="block"; 
     (<HTMLInputElement>document.getElementById('private')).style.display="none"; 

  }

 
}


