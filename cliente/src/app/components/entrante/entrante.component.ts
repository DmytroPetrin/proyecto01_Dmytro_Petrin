import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-entrante',
  templateUrl: './entrante.component.html',
  styleUrls: ['./entrante.component.css']
})
export class EntranteComponent implements OnInit {

  public entrantes: any[]=[];
  public ingrediente: any[]=[];
 

  public cantidad:FormGroup;
  
  constructor( private cartaService: CartaService, 
    private formBuilder: FormBuilder,
    private compraService: CompraService) { 
      this.cantidad = formBuilder.group({
        CANTIDAD:this.formBuilder.array([ this.formBuilder.control('1')])
    });
  }

  ngOnInit(): void {
    this.getEntrantes();
    this.getIngredienteEntrantes();
  }

  getEntrantes(){
    this.cartaService.getEntrantes().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.entrantes.push(element);
        this.CANTIDAD.push(this.formBuilder.control('1'));
      });
    });
  }

  getIngredienteEntrantes(){
    this.cartaService.getIngredienteEntrantes().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.ingrediente.push(element);
      });
    });
  }

  addProducto(id:number, i:number){
      var cantidad = this.CANTIDAD.value[i];
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("e"+id, cantidad);
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD') as FormArray;
}

}
