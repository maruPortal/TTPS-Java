import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  enviado:Boolean;
  me: Usuario;
  datos: String[];
  constructor(
    private userService: UsuarioserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enviado=false;
    this.datos = this.userService.recuperarData();
    console.log(this.datos);
  }

  onSubmit(usuario: NgForm) {
    this.userService.editUser(usuario).subscribe(
      () => {
        //actualiza los datos
        this.enviado=true;
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
      }
    );
  }
}
