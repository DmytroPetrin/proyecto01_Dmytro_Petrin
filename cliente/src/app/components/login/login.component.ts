import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*
@NgModule({
  declarations: [ 
    LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule // <<<< And here
  ],
  
  bootstrap: [LoginComponent],
  exports:  [LoginComponent]
})
*/


 export class LoginComponent implements OnInit {

  user = {
    userName: 'Dmytro',
    pass: '123456'
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logIn(){
    console.log(this.user);
    this.authService.signin(this.user).subscribe(res=>{
      console.log(res);
    })
  }

}


