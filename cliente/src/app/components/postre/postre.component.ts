import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-postre',
  templateUrl: './postre.component.html',
  styleUrls: ['./postre.component.css']
})
export class PostreComponent implements OnInit {

  public postre: any[]=[];
 
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
    this.getPostres();
    
  }

  getPostres(){
    this.cartaService.getPostres().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.postre.push(element);
        this.CANTIDAD.push(this.formBuilder.control('1'));
      });
    });
  }

  
  addProducto(id:number, i:number){
      var cantidad = this.CANTIDAD.value[i];
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("x"+id, cantidad);
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD') as FormArray;
}

}
