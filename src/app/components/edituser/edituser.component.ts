import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-edituser, ngbd-dropdown-basic',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  enviado: Boolean;
  nombre: String;
  apellido: String;
  username: String;
  password: String;
  email: String;
  tipoPass: String;
  user_tipo: String;
  soloText = /^[A-Z]+$/i;
  formatoMail = /^[-\w.%+]{1,64}@(?:[A-Z]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  constructor(
    private userService: UsuarioserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.enviado = false;
    this.tipoPass = 'password';
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.getUsuario();
  }

  getUsuario() {
    this.userService.recuperarData().subscribe((usuario) => {
      this.apellido = usuario.apellido;
      this.nombre = usuario.nombre;
      this.username = usuario.username;
      this.password = usuario.password;
      this.email = usuario.email;
    });
  }

  onSubmit(usuario: NgForm) {
    let envio = this.comprobarCampos(usuario);
    if (this.validarCampos(envio)) {
      this.userService.editUser(envio).subscribe(
        () => {
          //actualiza los datos
          this.toastr.success(
            'Perfil actualizado con exito',
            'Perfil Actualizado'
          );
        },
        (err: HttpErrorResponse) => {
          console.log('estado de error: ', err.status, typeof err.status);
          if (err.status == 400) {
            this.toastr.error(
              'El username o email ya existen en el sistema',
              'Error',
              { timeOut: 4000 }
            );
          } else {
            this.toastr.error('Error al actualizar el perfil', 'Error');
          }
        }
      );
    } else {
      //msj
      this.toastr.error('Error en los datos ingresados', 'Error');
    }
  }

  comprobarCampos(data: NgForm): NgForm {
    if (data.value.apellido.trim() == '') {
      data.value.apellido = this.apellido;
    }
    if (data.value.nombre.trim() == '') {
      data.value.nombre = this.nombre;
    }
    if (data.value.username.trim() == '') {
      data.value.username = this.username;
    }
    if (data.value.password.trim() == '') {
      data.value.password = this.password;
    }
    if (data.value.email.trim() == '') {
      data.value.email = this.email;
    }
    return data;
  }

  validarCampos(edit: NgForm): boolean {
    if (!this.soloText.test(edit.value.nombre)) return false;
    if (!this.soloText.test(edit.value.apellido)) return false;
    if (!this.formatoMail.test(edit.value.email)) return false;

    return true;
  }
  /*comprobarCampos(data: NgForm){
    return (data.value.apellido.trim()=="") || (data.value.nombre.trim()=="") || (data.value.username.trim()=="") || (data.value.password.trim()=="") || (data.value.email.trim()=="");
    
  }*/

  redireccionar() {
    let tipo = sessionStorage.getItem('tipoUsuario');
    if (tipo == 'FoodTrucker') {
      this.router.navigateByUrl('home-foodtrucker');
    } else {
      this.router.navigateByUrl('home-organizador');
    }
  }

  changePass() {
    if (this.tipoPass == 'password') {
      this.tipoPass = 'text';
    } else {
      this.tipoPass = 'password';
    }
  }

  logOut() {
    this.userService.logOut();
  }
}
