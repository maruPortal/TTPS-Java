import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foodtruck } from '../model/foodtruck';
import { NewfoodtruckComponent } from '../components/newfoodtruck/newfoodtruck.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FoodtruckService {
  elEstado: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  createFoodtruck(ft: NgForm, img) {
    console.log(img);
    let id = sessionStorage.getItem('id');
    let dueñoID = { id: `${id}` };
    let ftruck = {
      nombre: ft.value.nombre,
      tipo_servicio: ft.value.tipo_servicio,
      descripcion: ft.value.descripcion,
      url: ft.value.url,
      instagram: ft.value.instagram,
      facebook: ft.value.facebook,
      whatsapp: ft.value.whatsapp,
      dueno: dueñoID,
      imagenes: img,
    };
    this.http.post<any>(`${environment.url}/foodtruck`, ftruck).subscribe(
      (response) => {
        this.toastr.success(
          'El foodtruck se agrego con exito',
          'FoodTruck Creado',
          { timeOut: 4000 }
        );
        this.router.navigateByUrl('list-foodtrucks');
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
        this.toastr.error(
          'Error al crear el foodtruck: ' + err.status,
          'Error'
        );
      }
    );
  }

  deleteFoodtruck(ft: Foodtruck): Observable<Object> {
    // return this.http.delete(`${environment.url}/foodtruck/${idFt}`);
    return this.http.put<Foodtruck>(
      `${environment.url}/foodtruck/${ft.id}`,
      ft
    );
  }

  getFoodtrucks(): Observable<Foodtruck[]> {
    let id = sessionStorage.getItem('id');
    return this.http.get<Foodtruck[]>(`${environment.url}/foodtruck/${id}`);
  }

  recuperarData(): Observable<Foodtruck> {
    let id = sessionStorage.getItem('idFt');
    return this.http.get<Foodtruck>(
      `${environment.url}/foodtruck/recuperarIndividual/${id}`
    );
  }

  updateFt(ft: NgForm): Observable<Foodtruck> {
    let id = sessionStorage.getItem('idFt');

    let idO = sessionStorage.getItem('id');
    let dueñoID = { id: `${idO}` };
    let ftruck = {
      nombre: ft.value.nombre,
      tipo_servicio: ft.value.tipo_servicio,
      descripcion: ft.value.descripcion,
      url: ft.value.url,
      instagram: ft.value.instagram,
      facebook: ft.value.facebook,
      whatsapp: ft.value.whatsapp,
      dueno: dueñoID,
    };
    return this.http.put<Foodtruck>(
      `${environment.url}/foodtruck/${id}`,
      ftruck
      // {
      //   headers: { token: '1123456' },
      // }
    );
  }

  topFoodtrucks(): Observable<Foodtruck[]> {
    return this.http.get<Foodtruck[]>(
      `${environment.url}/foodtruck/topFoodtrucks`
    );
  }

  addPic(id, base64textString): Observable<Foodtruck> {
    let body = {
      imagen: base64textString[0].toString(),
    };
    return this.http.post<Foodtruck>(
      `${environment.url}/foodtruck/pruebaImagen/1`,
      body
    );
  }

  pedirImagenes(idFt): Observable<String[]> {
    console.log('entre');
    return this.http.get<String[]>(
      `${environment.url}/foodtruck/${idFt}/imagenes`
    );
  }

  topFoodtruckImages(): Observable<String[]> {
    return this.http.get<String[]>(
      `${environment.url}/foodtruck/topFoodtrucks/imagenes`
    );
  }
}
