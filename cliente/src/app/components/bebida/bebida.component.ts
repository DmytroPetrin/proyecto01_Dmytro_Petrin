import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.css']
})
export class BebidaComponent implements OnInit {
  public bebida: any[]=[];
 
  

  public cantidad:FormGroup;
  
  constructor( private cartaService: CartaService, 
    private formBuilder: FormBuilder,
    private compraService: CompraService) { 
      this.cantidad = formBuilder.group({
        CANTIDAD:this.formBuilder.array([ this.formBuilder.control('1')])
    });
  }

  ngOnInit(): void {
    this.getBebida();
    
  }

  getBebida(){
    this.cartaService.getBebida().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        element.SIZE = element.TAMAÑO;
        this.bebida.push(element);
        this.CANTIDAD.push(this.formBuilder.control('1'));
      });
    });
  }

  addProducto(id:number, i:number){
      var cantidad = this.CANTIDAD.value[i];
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("b"+id, cantidad);
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD') as FormArray;
}

}
