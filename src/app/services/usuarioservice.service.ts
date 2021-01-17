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
        headers: { token: id + '123456' },
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

  recuperarData(): Observable<Usuario> {
    let id = sessionStorage.getItem('id');
    return this.http
      .get<Usuario>(`${environment.url}/usuario/${id}`, {
        headers: { token: id + '123456' },
      });
  }

  isLogin() {
    return !(sessionStorage.getItem('id') == null);
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

  createFoodtrucker(register: NgForm): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${environment.url}/usuario/foodtrucker`, register.value);
    
  }

  createOrganizador(register: NgForm): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${environment.url}/usuario/organizador`, register.value);
  }

  editUser(usuario: NgForm): Observable<Usuario> {
    let id = sessionStorage.getItem('id');
    let usu = new Usuario;
    usu.apellido = `${usuario.value.apellido}`;
    usu.nombre = `${usuario.value.nombre}`;
    usu.username = `${usuario.value.username}`;
    usu.password = `${usuario.value.password}`;
    usu.email = `${usuario.value.email}`;
    return this.http.put<Usuario>(
      `${environment.url}/usuario/${id}`,
      usuario.value,
      {
        headers: { token: '1123456' },
      }
    );
  }
}
