import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homeorganizador',
  templateUrl: './homeorganizador.component.html',
  styleUrls: ['./homeorganizador.component.css']
})
export class HomeorganizadorComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  constructor() { }

  ngOnInit(): void {
    this.user_username=sessionStorage.getItem('username');
    this.user_tipo=sessionStorage.getItem('tipoUsuario');

  }

}
