import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homefoodtrucker',
  templateUrl: './homefoodtrucker.component.html',
  styleUrls: ['./homefoodtrucker.component.css']
})
export class HomefoodtruckerComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  constructor() { }

  ngOnInit(): void {
    this.user_username=sessionStorage.getItem('username');
    this.user_tipo=sessionStorage.getItem('tipoUsuario');

  }

}
