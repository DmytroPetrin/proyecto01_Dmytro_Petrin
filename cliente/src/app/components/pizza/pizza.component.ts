import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private compraService: CompraService) { 
      this.cantidad = formBuilder.group({
        CANTIDAD:this.formBuilder.array([ this.formBuilder.control('1')])
    });
  }

  ngOnInit(): void {
    this.getPizza();
    this.getIngredientePizza();
  }

  getPizza(){
    this.cartaService.getPizza().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.pizza.push(element);
        this.CANTIDAD.push(this.formBuilder.control('1'));
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

  addProducto(id:number, i:number){
      var cantidad = this.CANTIDAD.value[i];
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("p"+id, cantidad);
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD') as FormArray;
}

}
