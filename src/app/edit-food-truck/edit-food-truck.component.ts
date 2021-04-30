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
  imagenes: String[];
  imagenesBack = [];
  error: Boolean;
  sinCambios: Boolean;
  cortarImg: Boolean = false;

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
      this.imagenes = ft.imagenes;
      for (let each of ft.imagenes) {
        this.imagenesBack.push(each);
      }
    });
  }

  onSubmit(ft: NgForm) {
    this.sinCambios = this.verCambios(ft);
    console.log(this.sinCambios);

    let envio = this.comprobarCampos(ft);
    console.log('campos con al menos una letra? -> ', this.validarTextos(ft));
    if (this.imagenes.length > 0) {
      this.ftService.updateFt(envio, this.imagenes).subscribe(
        () => {
          if (this.sinCambios) {
            this.toastr.warning(
              'No se detectaron cambios',
              'Modificacion Cancelada',
              { timeOut: 4000 }
            );
          } else {
            this.toastr.success(
              'El foodtruck fue modificado con exito',
              'Modificación Exitosa'
            );
          }
          this.router.navigateByUrl('list-foodtrucks');
        },
        (err: HttpErrorResponse) => {
          console.log('estado de error: ', err.status);
          this.toastr.error(
            'Error al modificar el foodtruck:  ' + err.status,
            'Error'
          );
        }
      );
    } else {
      this.toastr.info('Por favor agrega al menos 1 imagen', 'Faltan imagenes');
    }
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
      ft.value.whatsapp == '' &&
      this.comprobarImagenes()
    );
  }

  //valida que los campos de texto no sean solo números
  validarTextos(ft: NgForm): Boolean {
    let soloNumeros = /^[0-9]+$/i;
    return (
      !soloNumeros.test(ft.value.descripcion) &&
      !soloNumeros.test(ft.value.nombre) &&
      !soloNumeros.test(ft.value.tipo_servicio) &&
      !soloNumeros.test(ft.value.url) &&
      !soloNumeros.test(ft.value.instagram) &&
      !soloNumeros.test(ft.value.facebook)
    );
  }

  comprobarImagenes() {
    if (
      this.imagenes.length > this.imagenesBack.length ||
      this.imagenes.length < this.imagenesBack.length
    ) {
      return false;
    }
    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.imagenes[i] != this.imagenesBack[i]) {
        return false;
      }
    }
    return true;
  }

  cancelar() {
    this.router.navigateByUrl('list-foodtrucks');
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.imagenes.push('data:image/png;base64,' + btoa(e.target.result));
    if (this.imagenes.length == 3) {
      this.cortarImg = true;
    }
  }

  sacarFoto(img) {
    this.imagenes.splice(this.imagenes.indexOf(img), 1);
    this.cortarImg = false;
  }

  logOut() {
    this.userService.logOut();
  }
}
