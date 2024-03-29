import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: String;
    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    }

    login(username: string, password: string){
        const headerDict = {
            usuario: username,
            clave: password,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
          };
          const requestOptions = {
            headers: new HttpHeaders(headerDict),
          };
        this.http.post<HttpResponse<Text>>(`${env.url}/usuario/autenticacion`,'',requestOptions).subscribe(
            (response: HttpResponse<Text>) => {
                
                localStorage.setItem('token', response["token"]);
                this.currentUser=response["token"];
                sessionStorage.setItem('id', response["usuario_id"]);
                sessionStorage.setItem('username', response["usuario_username"]);
                sessionStorage.setItem('tipoUsuario', response["usuario_tipo_usuario"]);
                console.log("pase");                       
                this.toastr.info("Bienvenido " + response["usuario_username"]);
                if (sessionStorage.getItem('tipoUsuario') == 'Organizador') {
                    this.router.navigateByUrl('home-organizador');
                } else {
                    this.router.navigateByUrl('home-foodtrucker');
                }
                return true;
            },
            (err: HttpErrorResponse) => {
                console.log("Problemas con Autenticacion - estado de error en login:  " + err.status );
                this.toastr.error("Usuario o Contraseña incorrectos", "Error");
                return false;
            });
    }

    logout() {
        // elimino las credenciales del localstorage al deslogearme
        localStorage.removeItem('token');
    }
}