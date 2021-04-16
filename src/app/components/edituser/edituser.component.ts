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
  enviado:Boolean;
  nombre: String;
  apellido: String;
  username: String;
  password: String;
  email: String;
  tipoPass:String;
  user_tipo:String;
  constructor(
    private userService: UsuarioserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.enviado=false;
    this.tipoPass="password";
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.userService.recuperarData()
    .subscribe(
      (usuario) => {
        this.apellido= usuario.apellido;
        this.nombre= usuario.nombre;
        this.username= usuario.username;
        this.password= usuario.password;
        this.email= usuario.email;
      }
    );
  }

  onSubmit(usuario: NgForm) {
    let envio= this.comprobarCampos(usuario);

    this.userService.editUser(envio).subscribe(
      () => {
        //actualiza los datos
        this.toastr.success("Perfil actualizado con exito","Perfil Actualizado");

      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
        this.toastr.error("Error al actualizar el perfil","Error");
      }
    );
  }

  comprobarCampos(data: NgForm): NgForm{
    if (data.value.apellido==""){
      data.value.apellido= this.apellido;
    }
    if (data.value.nombre==""){
      data.value.nombre= this.nombre;
    }
    if (data.value.username==""){
      data.value.username= this.username;
    }
    if (data.value.password==""){
      data.value.password= this.password;
    }
    if (data.value.email==""){
      data.value.email= this.email;
    }
    return data;
  }

  redireccionar(){
    let tipo = sessionStorage.getItem('tipoUsuario');
    if (tipo=="FoodTrucker"){
      this.router.navigateByUrl('home-foodtrucker');
    }else{
      this.router.navigateByUrl('home-organizador');
    }
  }
  
  changePass(){
    if(this.tipoPass=="password"){
      this.tipoPass="text";
    }else{
      this.tipoPass="password";
    }
  }

  logOut() {
    this.userService.logOut();
  }
}
