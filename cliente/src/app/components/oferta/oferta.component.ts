import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public oferta: any[]=[];
  public carta: any[]=[];
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
    this.getOfertas();
    this.getCartabyid();
    this.getIngredientebyid();
    //console.log(this.carta);  
  }

  getOfertas(){
  
    this.cartaService.getOferta().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        
        this.oferta.push(element);
        this.CANTIDAD.push(this.formBuilder.control('1'));
      });
    });
    //console.log(this.carta);
   }
  
  getCartabyid() {
    this.cartaService.getCartabyid().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.carta.push(element);
      });
    });
  }

  getIngredientebyid() {
    this.cartaService.getIngredientebyid().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.ingrediente.push(element);
      });

    });
  }

  addProducto(id:number, i:number){
      var cantidad = this.CANTIDAD.value[i];
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("o"+id, cantidad);
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD') as FormArray;
}
   
}
