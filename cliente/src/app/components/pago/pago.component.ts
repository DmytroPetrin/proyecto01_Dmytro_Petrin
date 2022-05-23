import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public tarjeta = true;
  public efectivo = false;
  public domicilio = true;
  public recoger = false;

  constructor() { }

  ngOnInit(): void {
  }

  //logica de los botones
  tarjetaPago($event: any){
    if(!this.tarjeta){
      this.tarjeta = $event.target.checked;
      this.efectivo = false;
    }
  }

  efectivoPago($event: any){
    if(!this.efectivo){
      this.efectivo = $event.target.checked;
      this.tarjeta = false;
    }
   }

   aDomicilio($event: any){
     if(!this.domicilio){
       this.domicilio = $event.target.checked;
       this.recoger = false;
     }
   }

   aRecoger($event: any){
     if(!this.recoger){
       this.recoger = $event.target.checked;
       this.domicilio = false;
     }
   }


}
