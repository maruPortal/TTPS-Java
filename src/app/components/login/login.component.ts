import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: Boolean;
  constructor(
    private userService: UsuarioserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.isLogin()) {
      if (sessionStorage.getItem('tipoUsuario') == 'Organizador') {
        this.router.navigateByUrl('home-organizador');
      } else {
        this.router.navigateByUrl('home-foodtrucker');
      }
    }
  }

  onSubmit(login: NgForm) {
    this.userService.autenticacion(login).subscribe(
      (usuario) => {
        //almacenamiento en sesion
        this.error = false;
        sessionStorage.setItem('id', usuario.id);
        sessionStorage.setItem('username', usuario.username);
        sessionStorage.setItem('tipoUsuario', usuario.tipo_usuario);

        if (usuario.tipo_usuario == 'Organizador') {
          this.router.navigateByUrl('home-organizador');
        } else {
          this.router.navigateByUrl('home-foodtrucker');
        }
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
        this.error = true;
      }
    );
  }
}
