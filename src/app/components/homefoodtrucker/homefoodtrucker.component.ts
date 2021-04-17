import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homefoodtrucker, ngbd-dropdown-basic, ngbd-carousel-pause, ngbd-nav-markup',
  templateUrl: './homefoodtrucker.component.html',
  styleUrls: ['./homefoodtrucker.component.css'],
  styles: [`
    .botonNav:hover {
      background-color: #ffffff88;
    }
  `]
})
export class HomefoodtruckerComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  url_home: String;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  prueba = [1,2,3];
  //aca van los string en base64 con "data:image/png;base64," delante 
  images= []; 
  
  //aca van los ft
  fts = [];

  //aca van las solicitudes
  solis = [];
  nuevas = [];
  aceptadas = [];
  finalizadas = [];
  historial = [];

  constructor(private userService: UsuarioserviceService,
              private router: Router,
              private ftService: FoodtruckService,
              private toastr: ToastrService) {}

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngOnInit(): void {
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.userService.isFoodtrucker();
    this.url_home="home-" + this.user_tipo.toLowerCase();
    this.obtenerTopFoodtrucksImagenes();
    this.obtenerTopFoodtrucks();
    this.obtenerSolicitudes();
  }

  obtenerTopFoodtrucks(){
    this.ftService.topFoodtrucks().subscribe(
      (listaRes)=> {
        console.log("Fts: " + listaRes.length);
        this.fts = listaRes;
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
      }
    )
  }

  obtenerTopFoodtrucksImagenes(){
    this.ftService.topFoodtruckImages().subscribe(
      (listaRes)=> {
        this.images = listaRes;
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
      }
    )
  }

  obtenerSolicitudes(){
    this.userService.getSolicitudes().subscribe(
      (listaRes) => {
        console.log("Solis: " + listaRes.length);
        let estNue = [];
        let estAce = [];
        let estFin = [];
        let estHis = [];
        listaRes.forEach(function(value){
          if (value.estado == "Enviada"){
            estNue.push(value);
          }else{
            if (value.estado == "Aceptada"){
              estAce.push(value);
            }else{
              if (value.estado == "Finalizada"){
                estFin.push(value);
              }else{
                if(value.estado!="Cancelada"){
                  estHis.push(value);
                }
              }
            }
          }
        });
        this.nuevas = estNue.reverse();
        this.aceptadas = estAce.reverse();
        this.finalizadas = estFin.reverse();
        this.historial = estHis.reverse();
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
      }
    );
  }

  aceptarReserva(soli){
    this.userService.modificarSolicitud(soli.id,'Aceptada').subscribe(
      (response) => {
        this.nuevas.splice(this.nuevas.indexOf(soli),1);
        this.aceptadas.push(response);
        this.toastr.success("Se agrego la reserva a la solapa 'En Curso'","Solicitud Aceptada");
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error: " + err.status);
        this.toastr.error("Error al aceptar solicitud","Error");
      }
    )
  }

  rechazarReserva(soli){
    this.userService.modificarSolicitud(soli.id,'Rechazada').subscribe(
      (response) => {
        this.nuevas.splice(this.nuevas.indexOf(soli),1);
        this.toastr.success("Se rechazo la solicitud correctamente","Solicitud Rechazada");
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error: " + err.status);
        this.toastr.error("Error al aceptar solicitud","Error");
      }
    )
  }

  finalizarReserva(soli){
    this.userService.modificarSolicitud(soli.id,'Finalizada').subscribe(
      (response) => {
        this.aceptadas.splice(this.nuevas.indexOf(soli),1);
        this.toastr.success("Se finalizo la reserva correctamente y se la habilito para Calificar","Solicitud Finalizada",{timeOut:4000});
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error: " + err.status);
        this.toastr.error("Error al aceptar solicitud","Error");
      }
    )
  }

  logOut() {
    this.userService.logOut();
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.images.push('data:image/png;base64,' + btoa(e.target.result));
  }

  /*onSubmit(login: NgForm) {
    this.ftService.addPic(login,this.images).subscribe(
      (usuario) => {
        console.log("Paso")
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
      }
    );
  }*/

  /*

  METODOS DE PRUEBA PARA EL ENVIO DE IMAGENES EN BASE64, TODAVIA NO ANDA

  onSubmit(login: NgForm) {
    this.change=true;
    this.code=btoa(login.value.image);
    this.ftService.addPic(login,this.base64textString).subscribe(
      (usuario) => {
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
      }
    );
  }

  decodeM(){
    this.decode=true;
  }*/

}
