import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Foodtruck } from 'src/app/model/foodtruck';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/model/solicitud';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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
  solicitud: Solicitud;
  puntos: {};
  constructor(private userService: UsuarioserviceService,
              private ftService: FoodtruckService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.isOrganizador();
    this.solicitud = window.history.state.soli;
    if (this.solicitud==null){
      this.router.navigateByUrl('/');
    }
    this.puntos={'Limpieza':0, 'Simpatia':0, 'Calidad/Precio':0, 'Sabor':0, 'Diseno':0,}
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
    console.log('Diseño:  ' + this.puntos['Diseno']);
    this.userService.calificarSolicitud(this.solicitud.id,this.puntos).subscribe(
      (response)=>{
        this.router.navigateByUrl('/home-organizador');
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:   " + err.status);
      }
    )
  }
}
