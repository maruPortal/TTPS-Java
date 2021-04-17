import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from 'src/app/model/solicitud';
import { HttpErrorResponse } from '@angular/common/http';
import { ID_SEPARATOR } from '@angular/localize/src/utils';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  //images = [62, 83, 466, 965, 982,62, 83, 466, 965, 982].map((n) => `https://picsum.photos/id/${n}/900/500`);
  //aca van los string en base64 con "data:image/png;base64," delante 
  images=[]; 
  
  //aca van los ft
  fts = [];

  //aca van las solicitudes
  solis = [];
  pendientes = [];
  finalizadas = [];
  calificadas = [];
  activas = [];
  estadoCalificado="Calificada";
  estadoRechazado="Rechazada";
  constructor(private userService: UsuarioserviceService,
              private router: Router,
              private ftService: FoodtruckService,
              private toastr: ToastrService) {}

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngOnInit(): void {
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.userService.isOrganizador();
    this.obtenerTopFoodtrucksImagenes();
    this.obtenerTopFoodtrucks();
    this.obtenerSolicitudes();
  }
  
  obtenerTopFoodtrucksImagenes(){
    this.ftService.topFoodtruckImages().subscribe(
      (listaRes)=> {
        this.images = listaRes;
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
        this.toastr.error("Error al obtener imagenes - " + err.status, "Error");
      }
    )
  }

  obtenerTopFoodtrucks(){
    this.ftService.topFoodtrucks().subscribe(
      (listaRes)=> {
        this.fts = listaRes;
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
        this.toastr.error("Error al obtener top foodtrucks - " + err.status, "Error");
      }
    )
  }

  obtenerSolicitudes(){
    this.userService.getSolicitudes().subscribe(
      (listaRes) => {
        let estFin = [];
        let estPen = [];
        let estAct = [];
        let estCal = [];
        listaRes.forEach(function(value){
          if (value.estado == "Finalizada"){
            estFin.push(value);
          }else{
            if (value.estado == "Enviada"){
              estPen.push(value);
            }else{
              if(value.estado == "Calificada" || value.estado == "Rechazada"){
                estCal.push(value);
              }else{
                if(value.estado!= "Cancelada"){
                  estAct.push(value)
                }
              }
            }
          }
        });
        this.activas = estAct.reverse();
        this.calificadas = estCal.reverse();
        this.pendientes = estPen.reverse();
        this.finalizadas = estFin.reverse();
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:  " + err.status);
        this.toastr.error("Error al obtener solicitudes - " + err.status, "Error");
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
            console.log("No hubo resultados");
            this.toastr.info("Su busqueda no retorno ningun resultado", "Sin Resultados");
          }else{
            response.forEach(function(value){
              console.log(value.nombre + value.id);
            })
            this.router.navigateByUrl('/search-result', { state: {resultados: response}});
          }
        },
        (err: HttpErrorResponse) =>{
          console.log("estado de error:  " + err.status);
          this.toastr.error("Error al realizar busqueda","Error");
        }
      );
    }else{
      console.log("Pone algo para buscar")
    }

  }

  notVacios(ft:NgForm){
    let condZona= ((ft.value.zona == null) || (ft.value.zona.trim()==""));
    let condComida= ((ft.value.comida == null) || (ft.value.comida.trim()==""));
    let condNombre= ((ft.value.nombre == null) || (ft.value.nombre.trim()==""));

    return !((condZona && condComida)&&condNombre);
  }

  valorarReserva(sId){
    this.userService.getSolicitudEspecifica(sId).subscribe(
      (solicitud) => {
        console.log("Solicitud: " + solicitud.id);
        this.router.navigateByUrl('/valorarReserva', {state: {soli: solicitud}} );
      },
      (err: HttpErrorResponse) =>{
        console.log("estado de error:   " + err.status);
        this.toastr.error("Error al recuperar la solicitud para valorar","Error")
      }
    )
  }

  cancelarReserva(s){
    this.userService.cancelarSolicitud(s.id).subscribe(
      (solicitud) => {
        console.log("Antes: " + this.pendientes.toString());
        console.log(this.pendientes.indexOf(s));
        for(let each of this.pendientes){
          console.log(each.toString());
        }
        this.pendientes.splice(this.pendientes.indexOf(s),1);
        console.log("Despues: " + this.pendientes.toString());
        for(let each of this.pendientes){
          console.log(each.toString());
        }
        this.toastr.success("Solicitud cancelada con exito","Solicitud Cancelada");
      },
      (err: HttpErrorResponse) => {
        if (err.status==400){
          this.toastr.error("La solicitud ya fue aceptada y no puede cancelarse","Error",{timeOut:5000});
          this.pendientes.splice(this.pendientes.indexOf(s),1);
          this.activas.push(s);
        }else{
          this.toastr.error("Ocurrio un error al modificar la solicitud","Error");
        }
      }

    )
  }

}
