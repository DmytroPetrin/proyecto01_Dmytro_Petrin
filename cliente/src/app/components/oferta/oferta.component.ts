import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public oferta: any[]=[];
  public carta: any[]=[];
  public ingrediente: any[]=[];
  constructor(private cartaService: CartaService) { }

  ngOnInit(): void {
    this.getOfertas();
    this.getCartabyid();
    this.getIngredientebyid();
    console.log(this.carta);  
  }

  getOfertas(){
  
    this.cartaService.getOferta().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        
        this.oferta.push(element);
        
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
   
}
