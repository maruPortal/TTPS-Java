import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Foodtruck } from 'src/app/model/foodtruck';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css']
})
export class ResultadosBusquedaComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  cantRes;
  restante=[];
  fts=[];
  constructor(private userService: UsuarioserviceService,
              private ftService: FoodtruckService,) { 

    }
  

  ngOnInit(): void {
    this.cantRes=10;
    this.fts.push(new Foodtruck("1","Gin Bar","Cocteleria","El bar movil ideal para tu evento","www.ginbar.com.ar","@ginbar.truck"));
    this.restante = [Math.ceil(this.images.length / 4) - this.images.length];
    this.user_username="felaornella" //tempFela this.user_username = sessionStorage.getItem('username');
    this.user_tipo="Organizador"  //tempFela this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  logOut() {
    this.userService.logOut();
  }

}
