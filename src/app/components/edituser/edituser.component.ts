import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  constructor(private userService: UsuarioserviceService) {}

  ngOnInit(): void {}

  onSubmit(usuario: NgForm) {
    this.userService.editUser(usuario);
    console.log('conmponente', usuario.value);
  }
}
