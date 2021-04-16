import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: Boolean;
  title = "ProbandoToast";

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

  onSubmit(login: NgForm) {
    this.userService.autenticacion(login);
  }

  showStandard() {
    this.toastr.error("MensajePrueba",this.title);
  }
}