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
    
  }

  getEntrantes() {
    this.cartaService.getEntrantes().subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          element.SIZE = element.TAMAÑO;
          this.entrantes.push(element);
          this.CANTIDAD.push(this.formBuilder.control('1'));
        });
      },
      error: (err) => { console.log(err); },
      complete: () => { this.getIngredienteEntrantes(); }
    });
  }

  getIngredienteEntrantes() {
    this.cartaService.getIngredienteEntrantes().subscribe({
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
      this.compraService.guardarCarrito("e"+id, cantidad);
      
}

get CANTIDAD(){
  return this.cantidad.get('CANTIDAD') as FormArray;
}

ajustarDatos() {
  this.entrantes.forEach(element => {
    var arr = new Array;
    for (let i = 0; i < this.ingrediente.length; i++) {
      var element2 = this.ingrediente[i];
      if (arr.length == 0 && element.ID_ENTRANTES == element2.ENTRANTES) {
        arr.push(element2.IMAGEN);
      } else if (arr.length != 0 && element.ID_ENTRANTES == element2.ENTRANTES) {
        arr.forEach(element3 => {
          if (element3 == element2.IMAGEN) {
            //console.log(element.ID_ENTRANTES);
            this.ingrediente[i].IMAGEN = '';
            this.ingrediente[i].ALERGENOS = '';
          } else {
            arr.push(element2.IMAGEN);
          }
        });
      }
    }
  });
}

}
