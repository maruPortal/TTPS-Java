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
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioserviceService {
  usuario: Usuario;
  constructor(private http: HttpClient, private router: Router) {}

  getUsuario() {
    let id = sessionStorage.getItem('id');
    this.http
      .get<Usuario>(`${environment.url}/usuario/${id}`, {
        headers: { token: '1123456' },
      })
      .subscribe(
        (response) => {
          //actualiza los datos
          this.usuario = response;
          return response;
        },
        (err: HttpErrorResponse) => {
          console.log('estado de error: ', err.status, typeof err.status);
          return null;
        }
      );
  }

  recuperarData(): String[]{
    let arreglo = String[5];
    let id = sessionStorage.getItem('id');
    this.http
      .get<Usuario>(`${environment.url}/usuario/${id}`, {
        headers: { token: '1123456' },
      })
      .subscribe(
        (response) => {
          //actualiza los datos
          console.log(response.apellido);
          arreglo[0]=response.apellido;
          arreglo[1]=response.nombre;
          arreglo[2]=response.password;
          arreglo[3]=response.email;
          arreglo[4]=response.username;
        });
    console.log(arreglo);
    return arreglo;
  }


  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }

  autenticacion(login: NgForm): Observable<Usuario> {
    const headerDict = {
      usuario: `${login.value.usuario}`,
      clave: `${login.value.clave}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Usuario>(
      `${environment.url}/usuario/autenticacion`,
      '',
      requestOptions
    );
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
  editUser(usuario: NgForm): Observable<Usuario> {
    let id = sessionStorage.getItem('id');
    return this.http.put<Usuario>(
      `${environment.url}/usuario/${id}`,
      usuario.value,
      {
        headers: { token: '1123456' },
      }
    );
  }
}
