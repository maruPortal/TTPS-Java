import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from 'src/app/model/solicitud';
import { HttpErrorResponse } from '@angular/common/http';
import { ID_SEPARATOR } from '@angular/localize/src/utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-homeorganizador, ngbd-dropdown-basic, ngbd-carousel-pause, ngbd-nav-markup',
  templateUrl: './homeorganizador.component.html',
  styleUrls: ['./homeorganizador.component.css'],
  styles: [`
    .botonNav:hover {
      background-color: #ffffff88;
    }
  `]
})
export class HomeorganizadorComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  //imagenesDeLosFoodTruck
  images = [62, 83, 466, 965, 982,62, 83, 466, 965, 982].map((n) => `https://picsum.photos/id/${n}/900/500`);
  //aca van los string en base64 con "data:image/png;base64," delante 
  //images=[]; 
  
  //aca van los ft
  fts = [];

  //aca van las solicitudes
  solis = [];
  pendientes = [];
  finalizadas = [];
  
  constructor(private userService: UsuarioserviceService,
              private router: Router,
              private ftService: FoodtruckService,) {}

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngOnInit(): void {
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.userService.isOrganizador();
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

  obtenerSolicitudes(){
    this.userService.getSolicitudes().subscribe(
      (listaRes) => {
        console.log("Solis: " + listaRes.length);
        let estFin = [];
        let estPen = [];
        listaRes.forEach(function(value){
          if (value.estado == "Finalizada"){
            estFin.push(value);
          }else{
            if (value.estado == "Enviada"){
              estPen.push(value);
            }
          }
        });
        this.pendientes = estPen;
        this.finalizadas = estFin;
        console.log("Pend:  " + this.pendientes.length);
        console.log("Fina:  " + this.finalizadas.length);
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
      }
    );
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

  onSubmit(ft: NgForm){
    console.log("Criterios de busqueda: " + ft.value.zona + "\n" + ft.value.comida + "\n" + ft.value.nombre + "\n");
    if (this.notVacios(ft)){
      this.userService.buscar(ft).subscribe(
        (response) => {
          if (response==null){
            console.log("No hubo resultados")
          }else{
            response.forEach(function(value){
              console.log(value.nombre + value.id);
            })
            this.router.navigateByUrl('/search-result', { state: {resultados: response}});
          }
        },
        (err: HttpErrorResponse) =>{
          console.log("estado de error:  " + err.status);
        }
      );
    }else{
      console.log("Pone algo para buscar")
    }

  }

  notVacios(ft:NgForm){
    let avanzar=true;
    if ((ft.value.zona == null) || (ft.value.zona.trim()=="")){
      avanzar=false;
    }else{
      avanzar=true;
    }
    if ((ft.value.comida == null) || (ft.value.comida.trim()=="")){
      avanzar=false;
    }else{
      avanzar=true;
    }
    if ((ft.value.nombre == null) || (ft.value.nombre.trim()=="")){
      avanzar=false;
    }else{
      avanzar=true;
    }

    return avanzar;
  }

  valorarReserva(sId){
    this.userService.getSolicitudEspecifica(sId).subscribe(
      (solicitud) => {
        console.log("Solicitud: " + solicitud.id);
        this.router.navigateByUrl('/valorarReserva', {state: {soli: solicitud}} );
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:   " + err.status);
      }
    )
  }

}
