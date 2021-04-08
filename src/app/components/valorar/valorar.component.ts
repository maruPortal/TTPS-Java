import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Foodtruck } from 'src/app/model/foodtruck';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valorar, ngbd-rating-template, ',
  templateUrl: './valorar.component.html',
  styleUrls: ['./valorar.component.css'],
  styles: [`
    .star {
      font-size: 1.8rem;
      color: #00000077;
    }
    .filled {
      color: #ffe600ef;
    }
    .bad {
      color: #ff000077;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class ValorarComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  foodtruck: Foodtruck;
  puntos: {};
  evento: {};
  constructor(private userService: UsuarioserviceService,
              private ftService: FoodtruckService,
              private router: Router) { }

  ngOnInit(): void {
    this.foodtruck = new Foodtruck("1","Gin Bar","Cocteleria","El bar movil ideal para tu evento","www.ginbar.com.ar","@ginbar.truck");
    this.evento={"nombre":"El Callejón", "fecha_hora": "25 Ene. 2021 - 13hs", "direccion": "Calle 10, 598", "provincia":"La Plata, Buenos Aires"} ;
    this.puntos={'Limpieza':0, 'Simpatia':0, 'Calidad/Precio':0, 'Sabor':0, 'Diseño':0,}
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }


  logOut() {
    this.userService.logOut();
  }

  redireccionar(){
    let tipo = sessionStorage.getItem('tipoUsuario');
    if (tipo=="FoodTrucker"){
      this.router.navigateByUrl('home-foodtrucker');
    }else{
      this.router.navigateByUrl('home-organizador');
    }
  }

  enviarPuntos(){
    console.log('Limpieza:  ' + this.puntos['Limpieza']);
    console.log('Simpatia:  ' + this.puntos['Simpatia']);
    console.log('Calidad/Precio:  ' + this.puntos['Calidad/Precio']);
    console.log('Sabor:  ' + this.puntos['Sabor']);
    console.log('Diseño:  ' + this.puntos['Diseño']);
  }

}
