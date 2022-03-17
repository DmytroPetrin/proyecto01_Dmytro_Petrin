import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-entrante',
  templateUrl: './entrante.component.html',
  styleUrls: ['./entrante.component.css']
})
export class EntranteComponent implements OnInit {

  public entrantes: any[]=[];
  public ingrediente: any[]=[];
  

  constructor( private cartaService: CartaService) { }

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


}
