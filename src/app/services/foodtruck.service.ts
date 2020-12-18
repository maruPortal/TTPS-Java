import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foodtruck } from '../model/foodtruck';

@Injectable({
  providedIn: 'root',
})
export class FoodtruckService {
  constructor(private http: HttpClient, private router: Router) {}

  createFoodtruck(ft: NgForm) {
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
      dueño: dueñoID,
    };
    this.http
      .post<any>(`${environment.url}/foodtruck`, ftruck)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('home-foodtrucker');
  }

  deleteFoodtruck(id: string) {
    this.http.delete(`${environment.url}/foodtruck/1`).subscribe(
      (response) => {
        console.log(response);
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
      }
    );
  }

  getFoodtrucks(): Observable<Foodtruck[]> {
    let id = sessionStorage.getItem('id');
    return this.http.get<Foodtruck[]>(`${environment.url}/foodtruck/${id}`);
  }
}
