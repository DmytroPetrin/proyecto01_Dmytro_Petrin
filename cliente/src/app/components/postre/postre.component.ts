import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private formBilder: FormBuilder,
    private router: Router,
    private compraService: CompraService) { 
    this.cantidad = formBilder.group({
      CANTIDAD: new FormControl('1')})
  }

  ngOnInit(): void {
    this.getPostres();
    
  }

  getPostres(){
    this.cartaService.getPostres().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        this.postre.push(element);
      });
    });
  }

  
  addProducto(id:number){
    console.log(id);
      var cantidad = this.cantidad.get('CANTIDAD')?.value;
      console.log(cantidad);
      if(!cantidad){ cantidad = "1"}
      this.compraService.guardarCarrito("x"+id, cantidad);
      //this.router.navigate(['private']);
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD');
}

}
