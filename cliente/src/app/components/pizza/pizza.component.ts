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
    
    console.log(this.ingrediente);
    console.log(this.pizza);
  }

  getPizza() {
    this.cartaService.getPizza().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.pizza.push(element);
          this.CANTIDAD.push(this.formBuilder.control('1'));
        });
      },
      error: (err) => { console.log(err); },
      complete: () => { this.getIngredientePizza();}
    });
  }

  getIngredientePizza() {
    this.cartaService.getIngredientePizza().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.ingrediente.push(element);
        });
      },
      error: (err) => { console.log(err); },
      complete: () => {this.ajustarDatos(); }
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

  ajustarDatos() {
    this.pizza.forEach(element => {
      var arr = new Array;
      for (let i = 0; i < this.ingrediente.length; i++) {
        var element2 = this.ingrediente[i];
        if (arr.length == 0 && element.ID_PIZZA == element2.PIZZA) {
          arr.push(element2.IMAGEN);
        } else if (arr.length != 0 && element.ID_PIZZA == element2.PIZZA) {
          arr.forEach(element3 => {
            if (element3 == element2.IMAGEN) {
              //console.log(element.ID_PIZZA);
              this.ingrediente[i].IMAGEN = '';
              this.ingrediente[i].ALERGENOS = '';
            } else {
              arr.push(element2.IMAGEN);
            }
          });
        }
      }
    });
  }

}
