import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioserviceService {
  constructor(private http: HttpClient, private router: Router) {}

  autenticacion(login: NgForm) {
    this.http
      .post<any>(`${environment.url}/usuario/autenticacion`, login.value)
      .subscribe();
    this.router.navigateByUrl('home');
  }

  createFoodtrucker(register: NgForm) {
    this.http
      .post<any>(`${environment.url}/usuario/foodtrucker`, register.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('home'); // si todo ok => homeFoodTrucker
  }

  createOrganizador(register: NgForm) {
    this.http
      .post<any>(`${environment.url}/usuario/organizador`, register.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('home'); // si todo ok => homeOrganizador
  }
}
