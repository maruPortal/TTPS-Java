import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // tipo: String = '';
  condBoton: Boolean =false;
  constructor(
    private userService: UsuarioserviceService,
    private router: Router,
    private toastr: ToastrService
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
    this.condBoton=true;
    console.log(register.value);
    if (register.valid) {
      if (register.value.tipo === 'Foodtrucker') {
        this.userService.createFoodtrucker(register).subscribe(
          (response) => {
            localStorage.setItem('token', response["token"]);
            sessionStorage.setItem('id', response["usuario_id"]);
            sessionStorage.setItem('username', response["usuario_username"]);
            sessionStorage.setItem('tipoUsuario', response["usuario_tipo_usuario"]);
            this.router.navigateByUrl('home-foodtrucker');
            this.toastr.info("Bienvenido " + response["usuario_username"]);
          },
          (err: HttpErrorResponse) => {
            console.log('estado de error: ', err.status);
            this.toastr.error("Username o Email ya existen en el sistema","Error",{timeOut:4000});
            this.condBoton=false;
          }
        );
      }
      if (register.value.tipo === 'Organizador') {
        this.userService.createOrganizador(register)
        .subscribe(
          (response) => {
            localStorage.setItem('token', response["token"]);
            sessionStorage.setItem('id', response["usuario_id"]);
            sessionStorage.setItem('username', response["usuario_username"]);
            sessionStorage.setItem('tipoUsuario', response["usuario_tipo_usuario"]);
            this.router.navigateByUrl('home-organizador');
            this.toastr.info("Bienvenido " + response["usuario_username"]);
            
          },
          (err: HttpErrorResponse) => {
            console.log('estado de error: ', err.status);
            this.toastr.error("Username o Email ya existen en el sistema","Error",{timeOut:4000});
            this.condBoton=false;

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
