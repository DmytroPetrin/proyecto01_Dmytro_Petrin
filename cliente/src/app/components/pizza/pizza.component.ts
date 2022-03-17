import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  public pizza: any[]=[];
  public ingrediente: any[]=[];
  

  constructor( private cartaService: CartaService) { }

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

}
