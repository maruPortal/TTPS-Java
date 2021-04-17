import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Foodtruck } from 'src/app/model/foodtruck';
import { EventosService } from 'src/app/services/eventos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listeventos,  ngbd-modal-config',
  templateUrl: './listeventos.component.html',
  styleUrls: ['./listeventos.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ListeventosComponent implements OnInit {
  foodtrucks: Foodtruck[];

  user_username: String;
  user_tipo: String;
  url_home: String;
  eventos = [];
  constructor(
    private router: Router,
    private userService: UsuarioserviceService,
    private evService: EventosService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userService.isOrganizador();
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.url_home = 'home-' + this.user_tipo.toLowerCase();
    console.log(this.url_home);
    this.getEventos();
  }

  logOut() {
    this.userService.logOut();
  }

  open(content) {
    this.modalService.open(content);
  }

  borrarEvento(evento: Evento) {
    this.modalService.dismissAll(); //cierra cartelito de confirmación
    evento.eliminado = 1;
    console.log('eliminado?: ', evento.eliminado);
    this.evService.editarEvento(evento).subscribe(() => {
      this.toastr.success('Evento eliminado con exito', 'Evento Eliminado');
      this.getEventos();
    }),
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
        this.toastr.error('Error al eliminar evento :  ' + err.status, 'Error');
      };
  }

  getEventos() {
    this.evService.recuperarEventos().subscribe(
      (listRes) => {
        this.eventos = listRes.reverse();
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('Error al recuperar mis eventos', 'Error');
      }
    );
  }
}
