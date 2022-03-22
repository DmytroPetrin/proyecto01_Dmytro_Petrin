import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  public pizza: any[]=[];
  public ingrediente: any[]=[];
   
  public cantidad:FormGroup;
  
  constructor( private cartaService: CartaService, 
    private formBilder: FormBuilder,
    private router: Router) { 
    this.cantidad = formBilder.group({
      CANTIDAD: new FormControl('')})
  }

  ngOnInit(): void {
    this.getPizza();
    this.getIngredientePizza();
  }

  getPizza(){
    this.cartaService.getPizza().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.pizza.push(element);
      });
    });
  }

  getIngredientePizza(){
    this.cartaService.getIngredientePizza().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.ingrediente.push(element);
      });
    });
  }

  addProducto(id:number){
      console.log(id);
      if( localStorage.getItem('ROL') == 'cliente'){
        this.router.navigate(['private']);
      }else{this.router.navigate(['login']);}
  }
  
  get CANTIDAD(){
    return this.cantidad.get('CANTIDAD');
  }

}
