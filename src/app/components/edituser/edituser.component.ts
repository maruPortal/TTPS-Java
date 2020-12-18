import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  user: Usuario;
  constructor(private userService: UsuarioserviceService) {
    this.user = this.userService.getUsuario();
  }

  ngOnInit(): void {}

  onSubmit(usuario: NgForm) {
    this.userService.editUser(usuario);
  }
}
