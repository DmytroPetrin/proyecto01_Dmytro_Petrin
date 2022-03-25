import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private formBilder: FormBuilder,
    private router: Router,
    private compraService: CompraService) { 
    this.cantidad = formBilder.group({
      CANTIDAD: new FormControl('1')})
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
        var cantidad = this.cantidad.get('CANTIDAD')?.value;
        console.log(cantidad);
        if(!cantidad){ cantidad = "1"}
        this.compraService.guardarCarrito("p"+id, cantidad);
        //this.router.navigate(['private']);
      
  }
  
  get CANTIDAD(){
    return this.cantidad.get('CANTIDAD');
  }

}
