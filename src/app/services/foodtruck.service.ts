import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodtruckService {
  constructor(private http: HttpClient, private router: Router) {}

  createFoodtruck(ft: NgForm){
    let dueñoID = { id: 7 };
    let ftruck = {
      nombre: ft.value.nombre,
      tipo_servicio: ft.value.tipo_servicio,
      descripcion: ft.value.descripcion,
      url: ft.value.url,
      instagram: ft.value.instagram,
      facebook: ft.value.facebook,
      whatsapp: ft.value.whatsapp,
      dueño: dueñoID,
    };
    console.log('datos del form: ', ftruck);
    this.http
      .post<any>(`${environment.url}/foodtruck`, ftruck)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('home-foodtrucker');
  }
}
