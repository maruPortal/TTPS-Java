import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-homefoodtrucker, ngbd-dropdown-basic',
  templateUrl: './homefoodtrucker.component.html',
  styleUrls: ['./homefoodtrucker.component.css'],
})
export class HomefoodtruckerComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  constructor(private userService: UsuarioserviceService) {}

  ngOnInit(): void {
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  logOut() {
    this.userService.logOut();
  }
}
