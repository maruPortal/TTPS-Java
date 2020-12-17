import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // pasan cosas y "pierde" los datos en el camino :/
    // problema el map ¿?

    //LOGRE QUE SALGAN POR HEADER, PERO NO SE PORQUE SIGUE TIRANDO 403
    const headerDict = {
      'usuario': 'juanperez',
      'clave': 'password',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }   
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http
      .post<any>(`${environment.url}/usuario/autenticacion`,"",requestOptions)
      .subscribe((response) => {
        console.log('respuesta: ', response);  
      });
    //this.router.navigateByUrl('home-foodtrucker');
  }

  createFoodtrucker(register: NgForm) {
    this.http
      .post<any>(`${environment.url}/usuario/foodtrucker`, register.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('home-foodtrucker');
  }

  createOrganizador(register: NgForm) {
    this.http
      .post<any>(`${environment.url}/usuario/organizador`, register.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('home-organizador');
  }

  // me falta conseguir el ID de usuario logueado
  editUser(usuario: NgForm) {
    this.http
      .put<any>(`${environment.url}/usuario/8`, usuario.value, {
        headers: { token: '1123456' },
      })
      .subscribe();
  }
}
