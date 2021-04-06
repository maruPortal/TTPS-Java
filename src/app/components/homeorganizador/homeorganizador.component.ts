import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-homeorganizador, ngbd-dropdown-basic',
  templateUrl: './homeorganizador.component.html',
  styleUrls: ['./homeorganizador.component.css'],
})
export class HomeorganizadorComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  constructor(private userService: UsuarioserviceService) {}

  ngOnInit(): void {
    this.user_username="felaornella" //tempFela this.user_username = sessionStorage.getItem('username');
    this.user_tipo="Organizador" //tempFela this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }
  logOut() {
    this.userService.logOut();
  }
}
