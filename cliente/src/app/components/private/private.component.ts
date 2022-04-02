import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  
  public arr_carrito:string[]=[];
  public arr_cantidad:string[]=[];
  public carta:string[]=[]

  constructor(private cartaService: CartaService, private compraService: CompraService) { }

  ngOnInit(): void {
    
  }

  //quede por aqui, hay que modificar parte servidor
  //hacer carrito id para verificar si se creado id de la compra en la base de datos
  crearCompra(){
    const carr = localStorage.getItem('carrito');
    const cli = localStorage.getItem('ID');
    const compra =  localStorage.getItem('ID_compra');
    
    if(cli && !compra){
      const clint = parseInt(cli)
      console.log('antes de insert');
       this.compraService.registrarCompra(clint).subscribe((res:any)=>{res});
       console.log('antes de insert');
    }
   
  }

  getIdCliente(){
    this.compraService.getIdCliente().subscribe((res:any)=>{
      //console.log(res[0].ID);
      localStorage.setItem('ID_compra', res[0].ID);
    });
  }
}
