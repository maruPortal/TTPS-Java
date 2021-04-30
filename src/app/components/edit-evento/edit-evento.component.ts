import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { ToastrService } from 'ngx-toastr';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from 'src/app/model/evento';
import { NgbModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  icon,
  latLng,
  Map,
  LeafletMouseEvent,
  Marker,
  tileLayer,
  marker,
} from 'leaflet';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-evento, ngbd-dropdown-basic',
  templateUrl: './edit-evento.component.html',
  styleUrls: ['./edit-evento.component.css'],
})
export class EditEventoComponent implements OnInit {
  evento: Evento;
  eventoBack: Evento;
  user_tipo: String = 'Organizador';
  dataShow;
  map;
  options;
  marcador: Marker;
  marcadorBack: Marker;
  minDate: Date;
  fechaMinima;
  fechaActual: Date;
  fechaMostrar;
  horaActual: String;
  minActual: String;
  horas: String[] = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23',];

  // enviado: Boolean;
  // sinCambios: Boolean;

  constructor(
    private evService: EventosService,
    private router: Router,
    private userService: UsuarioserviceService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    config: NgbTimepickerConfig
  ) {
    config.spinners = false;
  }

  ngOnInit(): void {
    this.userService.isOrganizador();

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = iconDefault;
    //fecha y hora
    let today = new Date();
    this.fechaMinima = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    this.evService.getEvento(sessionStorage.getItem('idEvento')).subscribe(
      (event) => {
        this.evento = event;
        this.copiarValores(event);
        let x = this.evento.fecha_hora.toString();
        let fecha = moment(x, 'DD-MM-YYYY  HH:mm').format('YYYY-MM-DD HH:mm');
        this.fechaActual = new Date(fecha);
        this.fechaMostrar = {
          year: this.fechaActual.getFullYear(),
          month: this.fechaActual.getMonth() + 1,
          day: this.fechaActual.getDate(),
        };

        this.minActual = this.evento.fecha_hora.substr(-2);
        this.horaActual = this.evento.fecha_hora.substr(-5, 2);
        //centro mapa con geolocalizacion de evento
        let latlngStr = this.evento.geolocalizacion.split(',', 2);
        this.options = {
          layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
              attribution: '...',
            }),
          ],
          zoom: 13,
          center: latLng(parseFloat(latlngStr[0]), parseFloat(latlngStr[1])),
        };
        //coordenadas a mostrar
        this.dataShow =
          latlngStr[0].toString().substring(0, 10) +
          ', ' +
          latlngStr[1].toString().substring(0, 10);

        //marco mapa
        this.marcador = marker([
          parseFloat(latlngStr[0]),
          parseFloat(latlngStr[1]),
        ]);
        this.marcadorBack = marker([
          parseFloat(latlngStr[0]),
          parseFloat(latlngStr[1]),
        ]);
//        this.marcadorBack.addTo(this.map);

        
      }, //getEvento
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
        this.toastr.error(
          'Error al cargar datos de evento:  ' + err.status,
          'Error'
        );
      }
    );
  }

  copiarValores(e:Evento){
    this.eventoBack= new Evento(null,null,e.nombre,e.direccion,e.codigo_postal,e.provincia,e.geolocalizacion,e.fecha_hora,e.email,e.tel_contacto,e.descripcion,e.tipo_evento,e.forma_pago);
  }

  //chequea campos vacios
  comprobarCampos(): Boolean {
    return !((this.evento.nombre.trim()=="") || (this.evento.direccion.trim()=="") || 
      (this.evento.provincia.trim()=="") || (this.evento.email.trim()=="") || 
      (this.evento.tipo_evento.trim()=="") || (this.evento.fecha_hora.trim()=="") || 
      (this.evento.forma_pago.trim()=="") || (this.evento.descripcion.trim()=="") ||
      (this.evento.geolocalizacion.trim()==""));
  }

  verCambios() {
    //chequea si se modificaron los campos
    console.log(this.evento.codigo_postal);
    console.log(this.eventoBack.codigo_postal);
    let condnombre = this.evento.nombre==this.eventoBack.nombre;
    let conddireccion = this.evento.direccion==this.eventoBack.direccion;
    let condcodigo_postal=this.evento.codigo_postal==this.eventoBack.codigo_postal;
    let condprovincia=this.evento.provincia==this.eventoBack.provincia;
    let condgeolocalizacion=this.evento.geolocalizacion==this.eventoBack.geolocalizacion;
    let condfecha_hora=this.evento.fecha_hora==this.eventoBack.fecha_hora;
    let condemail=this.evento.email==this.eventoBack.email;
    let condtelcontacto=this.evento.tel_contacto==this.eventoBack.tel_contacto; 
    let conddescripcion=this.evento.descripcion==this.eventoBack.descripcion;
    let condtipo=this.evento.tipo_evento==this.eventoBack.tipo_evento;
    let condforma_pago=this.evento.forma_pago==this.eventoBack.forma_pago;
    return ((((((((((condnombre && conddireccion) && condcodigo_postal) && condprovincia) && condgeolocalizacion) 
                  && condfecha_hora) && condemail) && condtelcontacto) && conddescripcion) && condtipo) && condforma_pago);
  }

  onSubmit() {
    // this.sinCambios = this.verCambios(ft);
    
    this.evento.fecha_hora =
      this.fechaMostrar.day +
      '/' +
      this.fechaMostrar.month +
      '/' +
      this.fechaMostrar.year +
      '  ' +
      this.horaActual +
      ':' +
      this.minActual;
    this.evento.geolocalizacion =
      this.marcadorBack.getLatLng().lat.toString() +
      ', ' +
      this.marcadorBack.getLatLng().lng.toString();
    console.log("campos vacios?: ", this.comprobarCampos());
    if(this.comprobarCampos()){
      this.evService.editarEvento(this.evento).subscribe(
        () => {
          if (this.verCambios()) {
            this.toastr.warning(
              'No se detectaron cambios',
              'Modificacion Cancelada',
              { timeOut: 4000 }
            );
          } else {
            this.toastr.success(
              'El foodtruck fue modificado con exito',
              'Modificación Exitosa'
            );
          }
          this.router.navigateByUrl('list-eventos');
        },
        (err: HttpErrorResponse) => {
          console.log('estado de error: ', err.status);
          this.toastr.error(
            'Error al modificar el evento:  ' + err.status,
            'Error'
          );
        }
      );
    }else {
      console.log('campos vacios');
          this.toastr.error(
            'los campos no pueden estar vacios',
            'Error'
          );
    }
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  onMapReady(map: Map) {
    this.map = map;
    map.on('click', (e: LeafletMouseEvent) => this.marcar(e));
    if (this.marcadorBack != null) {
      this.marcadorBack.addTo(this.map);
    }
  }

  marcar(e: LeafletMouseEvent) {
    let lan = e.latlng.lat;
    let lng = e.latlng.lng;
    if (this.marcadorBack != null) {
      this.marcadorBack.removeFrom(this.map);
    }
    if (this.marcador != null) {
      this.marcador.removeFrom(this.map);
    }
    
    this.marcador = marker([lan, lng]).addTo(this.map);
    // this.habilitarButton = true;
  }

  confirmarMapa(){
    this.modalService.dismissAll();
    this.marcadorBack = new Marker(this.marcador.getLatLng());
    this.dataShow =
          this.marcador.getLatLng().lat.toString().substring(0, 10) +
          ', ' +
          this.marcador.getLatLng().lng.toString().substring(0, 10);
    this.options.center=this.marcadorBack.getLatLng();
    console.log(this.dataShow);
  }

  cancelar() {
    this.router.navigateByUrl('list-eventos');
  }

  logOut() {
    this.userService.logOut();
  }
}
