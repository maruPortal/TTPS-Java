import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // tipo: String = '';
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

  onSubmit(register: NgForm) {
    console.log(register.value);
    if (register.valid) {
      if (register.value.tipo === 'Foodtrucker') {
        this.userService.createFoodtrucker(register).subscribe(
          (usu) => {
            sessionStorage.setItem('id', usu.id);
            sessionStorage.setItem('username', usu.username);
            sessionStorage.setItem('tipoUsuario', usu.tipo_usuario);
            this.router.navigateByUrl('home-foodtrucker');
          },
          (err: HttpErrorResponse) => {
            console.log('estado de error: ', err.status, typeof err.status);
          }
        );
      }
      if (register.value.tipo === 'Organizador') {
        this.userService.createOrganizador(register).subscribe(
          (usu) => {
            sessionStorage.setItem('id', usu.id);
            sessionStorage.setItem('username', usu.username);
            sessionStorage.setItem('tipoUsuario', usu.tipo_usuario);
            this.router.navigateByUrl('home-organizador');
          },
          (err: HttpErrorResponse) => {
            console.log('estado de error: ', err.status, typeof err.status);
          }
        );
      }
    }
  }

  // setFT() {
  //   this.tipo = 'Foodtrucker';
  // }
  // setOrg() {
  //   this.tipo = 'Organizador';
  // }
}
