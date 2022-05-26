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
    
    console.log(this.carta);  
    console.log(this.ingrediente);
  }

  getOfertas() {
    this.cartaService.getOferta().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.oferta.push(element);
          this.CANTIDAD.push(this.formBuilder.control('1'));
        });
      },
      error: (err) => { console.log(err); },
      complete: () => { this.getCartabyid(); }
    });
  }
  
  getCartabyid() {
    this.cartaService.getCartabyid().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          element.SIZE = element.TAMAÑO
          this.carta.push(element);
        });
      },
      error: (err) => { console.log(err); },
      complete: () => { this.getIngredientebyid(); }
    });
  }

  getIngredientebyid() {
    this.cartaService.getIngredientebyid().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          this.ingrediente.push(element);
        });
      },
      error: (err) => { console.log(err); },
      complete: () => {
         this.ajustarDatos(); 
        }
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
   
  ajustarDatos() {
    this.carta.forEach(element => {
      if (element.QUE == 'P') {
        var arr = new Array;
        for (let i = 0; i < this.ingrediente.length; i++) {
          var element2 = this.ingrediente[i];
          if (arr.length == 0 && element.ID == element2.ID && element2.PE == 'P') {
            arr.push(element2.IMAGEN);
          } else if (arr.length != 0 && element.ID == element2.ID && element2.PE == 'P') {
            arr.forEach(element3 => {
              if (element3 == element2.IMAGEN) {
                //console.log(element.ID);
                this.ingrediente[i].IMAGEN = '';
                this.ingrediente[i].ALERGENOS = '';
              } else {
                arr.push(element2.IMAGEN);
              }
            });
          }
        }
      }
      else if (element.QUE == 'E') {
        var arr = new Array;
        for (let i = 0; i < this.ingrediente.length; i++) {
          var element2 = this.ingrediente[i];
          if (arr.length == 0 && element.ID == element2.ID && element2.PE == 'E') {
            arr.push(element2.IMAGEN);
          } else if (arr.length != 0 && element.ID == element2.ID && element2.PE == 'E') {
            arr.forEach(element3 => {
              if (element3 == element2.IMAGEN) {
                //console.log(element.ID);
                this.ingrediente[i].IMAGEN = '';
                this.ingrediente[i].ALERGENOS = '';
              } else {
                arr.push(element2.IMAGEN);
              }
            });
          }
        }
      }

    });
  }


}
