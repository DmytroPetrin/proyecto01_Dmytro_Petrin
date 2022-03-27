import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private formBilder: FormBuilder,
    private compraService: CompraService) { 
    this.cantidad = formBilder.group({
      CANTIDAD: new FormControl('1')})
  }

  ngOnInit(): void {
    this.getEntrantes();
    this.getIngredienteEntrantes();
  }

  getEntrantes(){
    this.cartaService.getEntrantes().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.entrantes.push(element);
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

  addProducto(id:number){
    console.log(id);
      var cantidad = this.cantidad.get('CANTIDAD')?.value;
      console.log(cantidad);
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("e"+id, cantidad);
      //this.cantidad.reset(this.cantidad.value);
      this.cantidad.patchValue({CANTIDAD:1});
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD');
}

}
