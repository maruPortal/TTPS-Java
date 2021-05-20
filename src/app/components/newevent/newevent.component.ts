import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import {NgbModal, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {latLng, Map, marker, tileLayer, LeafletMouseEvent, Marker, icon, LatLng } from 'leaflet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newevent, ngb-timepicker, ngb-datepicker',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
  styles: [
    `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
})
export class NeweventComponent implements OnInit{
  enviado: Boolean;
  error: Boolean;
  user_tipo: String;
  user_username: String;
  evento: Evento;
  minDate: Date;
  fechaMinima;
  habilitarButton:Boolean= false;
  dataShow;
  map;
  options;
  first= false;
  marcador: Marker = marker([-34.919654, -57.919169]);
  horas: String[] =["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
  
  constructor(
    private userService: UsuarioserviceService,
    private eventoService: EventosService,
    private router: Router,
    config: NgbTimepickerConfig,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {config.spinners=false;}

  ngOnInit(): void {
    
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
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;

      
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 13,
      center: this.marcador.getLatLng()
    };
    let today = new Date();
    this.fechaMinima={year:today.getFullYear(),month:today.getMonth()+1,day:today.getDate()};
    this.userService.isOrganizador();
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.enviado = false;
    this.error = false;
  }

  onMapReady(map: Map) {
    this.map=map;
    map.on('click', (e: LeafletMouseEvent) => this.marcar(e));
    if(this.marcador!=null && this.first){
      this.marcador.addTo(this.map);
    }
  }

  marcar(e: LeafletMouseEvent){
        let lan=e.latlng.lat;
        let lng=e.latlng.lng;
        if (!this.first){
          this.first=true;
        }
        if (this.marcador!= null){
          this.marcador.removeFrom(this.map);
        }
        this.marcador=marker([lan, lng]).addTo(this.map);
        this.dataShow=this.marcador.getLatLng().lat.toString().substring(0,10)+", "+this.marcador.getLatLng().lng.toString().substring(0,10);
        this.habilitarButton=true;
        this.options.center=this.marcador.getLatLng();
  }
  onSubmit(evento: NgForm) {
    // let estado =
    let fecha=(evento.value.fecha.day + "/" + evento.value.fecha.month + "/" + evento.value.fecha.year + "  " + evento.value.hora + ":" + evento.value.minuto);
    console.log(fecha);
    this.evento = evento.value;
    this.evento.fecha_hora=fecha;
    this.evento.geolocalizacion=this.marcador.getLatLng().lat.toString()+", "+this.marcador.getLatLng().lng.toString();
    console.log(this.evento);
    if (!this.verificarCampos(evento)){
      this.habilitarButton=false;
      this.userService.recuperarData().subscribe((user) => {
        this.evento.organizador = user;
        this.evento.tel_contacto = evento.value.telefono;
        this.evento.geolocalizacion = evento.value.geolocalizacion;
        this.eventoService.crearEvento(this.evento).subscribe(
          () => {
            this.enviado = true;
            this.error = false;
            this.toastr.success("Evento agregado con exito","Evento Agregado");
            this.router.navigateByUrl('list-eventos');
          },
          (err: HttpErrorResponse) => {
            console.log('estado de error: ', err.status, typeof err.status);
            this.enviado = false;
            this.error = true;
          }
        );
      });
      console.log(this.evento.organizador);
    }else{
      this.toastr.warning("Por favor, completa todos los campos","Datos Incompletos")
    }
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  logOut() {
    this.userService.logOut();
  }

  verificarCampos(ev: NgForm){
    return (ev.value.nombre.trim()=="") || (ev.value.direccion.trim()=="") || (ev.value.codigo_postal=="") || 
    (ev.value.provincia.trim()=="") || (ev.value.tipo_evento.trim()=="") || (ev.value.fecha_hora.trim()=="") || (ev.value.email.trim()=="") || 
    (ev.value.telefono=="") || (ev.value.forma_pago.trim()=="") || (ev.value.descripcion.trim()=="") || (ev.value.geolocalizacion.trim()=="");
  }
}
