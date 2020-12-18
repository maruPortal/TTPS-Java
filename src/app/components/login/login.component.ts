import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UsuarioserviceService) {}

  ngOnInit(): void {}

  onSubmit(login: NgForm) {
    this.userService.autenticacion(login);
  }
}
