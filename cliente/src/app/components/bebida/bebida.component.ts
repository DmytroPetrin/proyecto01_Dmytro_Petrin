import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private formBilder: FormBuilder,
    private compraService: CompraService) { 
    this.cantidad = formBilder.group({
      CANTIDAD: new FormControl('1')})
  }

  ngOnInit(): void {
    this.getBebida();
    
  }

  getBebida(){
    this.cartaService.getBebida().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.bebida.push(element);
      });
    });
  }

  addProducto(id:number){
    console.log(id);
      var cantidad = this.cantidad.get('CANTIDAD')?.value;
      console.log(cantidad);
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("b"+id, cantidad);
      //this.router.navigate(['private']);
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD');
}
}
