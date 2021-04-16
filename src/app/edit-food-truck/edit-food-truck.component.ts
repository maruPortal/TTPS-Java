import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Foodtruck } from 'src/app/model/foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-food-truck, ngbd-dropdown-basic',
  templateUrl: './edit-food-truck.component.html',
  styleUrls: ['./edit-food-truck.component.css'],
})
export class EditFoodTruckComponent implements OnInit {
  nombre: String;
  descripcion: String;
  tipo_servicio: String;
  url: String;
  instagram: String;
  facebook: String;
  whatsapp: String;
  error: Boolean;
  sinCambios: Boolean;
  constructor(
    private ftService: FoodtruckService,
    private router: Router,
    private userService: UsuarioserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.isFoodtrucker();
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
    this.sinCambios = this.verCambios(ft);

    let envio = this.comprobarCampos(ft);

    this.ftService.updateFt(envio).subscribe(
      () => {
        if (this.sinCambios) {
          this.toastr.warning("No se detectaron cambios","Modificacion Cancelada",{timeOut:4000});
        } else {
          this.toastr.success("El foodtruck fue modificado con exito","Modificación Exitosa");
        }
        this.router.navigateByUrl('list-foodtrucks');
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
        this.toastr.error("Error al modificar el foodtruck:  " + err.status,"Error");
      }
    );
  }

  comprobarCampos(data: NgForm): NgForm {
    if (data.value.descripcion == '') {
      data.value.descripcion = this.descripcion;
    }
    if (data.value.nombre == '') {
      data.value.nombre = this.nombre;
    }
    if (data.value.url == '') {
      data.value.url = this.url;
    }
    if (data.value.tipo_servicio == '') {
      data.value.tipo_servicio = this.tipo_servicio;
    }
    if (data.value.instagram == '') {
      data.value.instagram = this.instagram;
    }

    if (data.value.facebook == '') {
      data.value.facebook = this.facebook;
    }

    if (data.value.whatsapp == '') {
      data.value.whatsapp = this.whatsapp;
    }

    return data;
  }

  verCambios(ft: NgForm): Boolean {
    return (
      ft.value.descripcion == '' &&
      ft.value.nombre == '' &&
      ft.value.url == '' &&
      ft.value.tipo_servicio == '' &&
      ft.value.instagram == '' &&
      ft.value.facebook == '' &&
      ft.value.whatsapp == ''
    );
  }

  cancelar() {
    this.router.navigateByUrl('list-foodtrucks');
  }

  logOut() {
    this.userService.logOut();
  }

}
