import { Component, OnInit } from '@angular/core';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-postre',
  templateUrl: './postre.component.html',
  styleUrls: ['./postre.component.css']
})
export class PostreComponent implements OnInit {

  public postre: any[]=[];
 
  

  constructor( private cartaService: CartaService) { }

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

}
