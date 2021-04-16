import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Foodtruck } from 'src/app/model/foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { ToastrService } from 'ngx-toastr';
import { EventosService } from 'src/app/services/eventos.service';

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
  sinCambios: Boolean;
  user_tipo: String ="Organizador";
  enviado: Boolean;
  constructor(
    private evService: EventosService,
    private router: Router,
    private userService: UsuarioserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.isOrganizador();
    //hacer metodo para recuperar evento
    /*this.evService.recuperarData().subscribe((ft) => {
      this.nombre = ft.nombre;
      this.descripcion = ft.descripcion;
      this.tipo_servicio = ft.tipo_servicio;
      this.url = ft.url;
      this.instagram = ft.instagram;
      this.facebook = ft.facebook;
      this.whatsapp = ft.whatsapp;
    });*/
  }

  onSubmit(ft: NgForm) {
    this.sinCambios = this.verCambios(ft);

    let envio = this.comprobarCampos(ft);
    //hacer metodo para actualizar evento
    /*this.ftService.updateFt(envio).subscribe(
      () => {
        if (this.sinCambios) {
          this.toastr.warning("No se detectaron cambios","Modificacion Cancelada",{timeOut:4000});
        } else {
          this.toastr.success("El foodtruck fue modificado con exito","Modificación Exitosa");
        }
        this.router.navigateByUrl('list-foodtrucks');
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
        this.toastr.error("Error al modificar el foodtruck:  " + err.status,"Error");
      }
    );*/
  }

  comprobarCampos(data: NgForm): NgForm {
    return data;
  }

  verCambios(data){
    return true;
  }

  cancelar() {
    this.router.navigateByUrl('list-foodtrucks');
  }

  logOut() {
    this.userService.logOut();
  }

}