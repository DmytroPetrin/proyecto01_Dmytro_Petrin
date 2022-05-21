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

  logIn() {
    //console.log(this.user);
    this.authService.signin(this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res != 'Usuario o clave incorrectos') {
          localStorage.setItem('token', res.token);
        }
      },
      error: (err) => { console.log(err); },
      complete: () => { 
        this.authService.descifrarToken();
        const x = localStorage.getItem('ROL');
        switch (x){
          case "cliente": {
            this.router.navigate(['/private/carrito-compra']);
            break;
          }
          case "empleado": {
            this.router.navigate(['empleado']);
            break;
          }
          case "admin": {
            this.router.navigate(['admin']);
            break;
          }
        }
        
      }
    });
  }
  
  
}


