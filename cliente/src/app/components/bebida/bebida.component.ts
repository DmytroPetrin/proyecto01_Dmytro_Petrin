import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.css']
})
export class BebidaComponent implements OnInit {
  public bebida: any[]=[];
 
  

  constructor( private cartaService: CartaService) { }

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

}
