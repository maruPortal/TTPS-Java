import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-newevent',
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
export class NeweventComponent implements OnInit {
  enviado: Boolean;
  error: Boolean;
  user_tipo: String;
  user_username: String;
  evento: Evento;

  constructor(
    private userService: UsuarioserviceService,
    private eventoService: EventosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.userService.isFoodtrucker();
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.enviado = false;
    this.error = false;
  }

  onSubmit(evento: NgForm) {
    // let estado =
    this.evento = evento.value;
    console.log(this.evento);
    this.userService.recuperarData().subscribe((user) => {
      this.evento.organizador = user;
      this.evento.tel_contacto = evento.value.telefono;
      this.evento.geolocalizacion = evento.value.geolocalizacion;
      this.eventoService.crearEvento(this.evento).subscribe(
        () => {
          this.enviado = true;
          this.error = false;
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
  }

  logOut() {
    this.userService.logOut();
  }
}
