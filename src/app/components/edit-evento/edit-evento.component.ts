import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Foodtruck } from 'src/app/model/foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-edit-evento, ngbd-dropdown-basic',
  templateUrl: './edit-evento.component.html',
  styleUrls: ['./edit-evento.component.css'],
})
export class EditEventoComponent implements OnInit {
  nombre: String;
  descripcion: String;
  tipo_servicio: String;
  url: String;
  instagram: String;
  facebook: String;
  whatsapp: String;
  error: Boolean;
  sinCambios: Boolean;
  user_tipo: String ="Organizador";
  enviado: Boolean;
  constructor(
    private ftService: FoodtruckService,
    private router: Router,
    private userService: UsuarioserviceService
  ) {}

  ngOnInit(): void {
    //this.userService.isFoodtrucker();
    this.ftService.recuperarData().subscribe((ft) => {
      this.nombre = ft.nombre;
      this.descripcion = ft.descripcion;
      this.tipo_servicio = ft.tipo_servicio;
      this.url = ft.url;
      this.instagram = ft.instagram;
      this.facebook = ft.facebook;
      this.whatsapp = ft.whatsapp;
    });
  }

  onSubmit(ft: NgForm) {
 //   this.sinCambios = this.verCambios(ft);

    let envio = this.comprobarCampos(ft);

    this.ftService.updateFt(envio).subscribe(
      () => {
        if (this.sinCambios) {
          console.log('No hubo cambios');
          sessionStorage.setItem('estadoModificacion', 'SinCambios');
        } else {
          sessionStorage.setItem(
            'estadoModificacion',
            'ModificadoExitosamente'
          );
        }
        this.router.navigateByUrl('list-foodtrucks');
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
        this.error = true;
      }
    );
  }

  comprobarCampos(data: NgForm): NgForm {
    
    return data;
  }

  

  cancelar() {
    this.router.navigateByUrl('list-foodtrucks');
  }

  logOut() {
    this.userService.logOut();
  }

}