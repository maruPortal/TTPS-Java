import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Foodtruck } from 'src/app/model/foodtruck';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from 'src/app/model/solicitud';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class ReservarComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  modalActivo: Boolean;
  foodtruck: Foodtruck;
  eventos = [];
  modalSeleccion: Boolean;
  eventoSeleccionado: Evento;
  haySeleccion: Boolean;
  solicitud: Solicitud = new Solicitud();

  constructor(
    private userService: UsuarioserviceService,
    private ftService: FoodtruckService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('FT:  ' + window.history.state.ft);
    this.haySeleccion = false;
    this.foodtruck = window.history.state.ft;
    if (this.foodtruck == null) {
      this.router.navigateByUrl('/');
    }
    this.userService
      .getMisEventos(sessionStorage.getItem('id'))
      .subscribe((eventos) => {
        console.log(eventos);
        this.eventos = eventos;
      });

    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  logOut() {
    this.userService.logOut();
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  marcarSeleccionado(ev) {
    this.eventoSeleccionado = ev;
    this.haySeleccion = true;
    this.modalService.dismissAll();
  }

  cancelar() {
    this.router.navigateByUrl('/home-organizador');
  }

  confirmarReserva() {
    this.userService.recuperarData().subscribe((user) => {
      this.solicitud.foodtruck = this.foodtruck;
      this.solicitud.evento = this.eventoSeleccionado;
      this.solicitud.solicitado = this.foodtruck.dueno;
      this.solicitud.creador = user;
      this.userService.createSolicitud(this.solicitud).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
