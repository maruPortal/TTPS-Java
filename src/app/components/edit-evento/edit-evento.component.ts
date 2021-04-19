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
  user_tipo: String = 'Organizador';
  dataShow;
  map;
  options;
  marcador: Marker;
  minDate: Date;
  fechaMinima;
  fechaActual: Date;
  fechaMostrar;
  horaActual: String;
  minActual: String;
  horas: String[] = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

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
        let x = this.evento.fecha_hora.toString();
        let fecha = moment(x, 'DD-MM-YYYY  HH:mm').format('YYYY-MM-DD HH:mm');
        this.fechaActual = new Date(fecha);
        this.fechaMostrar = {
          year: this.fechaActual.getFullYear(),
          month: this.fechaActual.getMonth() + 1,
          day: this.fechaActual.getDate(),
        };
        // this.minActual = this.fechaActual.getMinutes().toString(); // 0
        // this.horaActual = this.fechaActual.getHours().toString();
        this.minActual = this.evento.fecha_hora.substr(-2); //00
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
        this.marcador.addTo(this.map);
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

  //chequea si hubo modificacion
  comprobarCampos(): Boolean {
    return true;
  }

  verCambios() {
    //tarea pa casa
    return true;
  }

  onSubmit() {
    // this.sinCambios = this.verCambios(ft);
    // this.comprobarCampos();
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
      this.marcador.getLatLng().lat.toString() +
      ', ' +
      this.marcador.getLatLng().lng.toString();
    this.evService.editarEvento(this.evento).subscribe(
      () => {
        if (!this.verCambios()) {
          //hacer
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
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  onMapReady(map: Map) {
    this.map = map;
    map.on('click', (e: LeafletMouseEvent) => this.marcar(e));
    if (this.marcador != null) {
      this.marcador.addTo(this.map);
    }
  }

  marcar(e: LeafletMouseEvent) {
    let lan = e.latlng.lat;
    let lng = e.latlng.lng;
    if (this.marcador != null) {
      this.marcador.removeFrom(this.map);
    }
    this.marcador = marker([lan, lng]).addTo(this.map);
    this.dataShow =
      this.marcador.getLatLng().lat.toString().substring(0, 10) +
      ', ' +
      this.marcador.getLatLng().lng.toString().substring(0, 10);
    // this.habilitarButton = true;
  }

  cancelar() {
    this.router.navigateByUrl('list-foodtrucks');
  }

  logOut() {
    this.userService.logOut();
  }
}
