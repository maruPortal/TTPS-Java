import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ControlContainer } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { UsuarioserviceService } from '../services/usuarioservice.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(private usuService: UsuarioserviceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // agrego Authorization Header con jwt token si esta disponible
      let currentUser = localStorage.getItem("token");
      if (currentUser) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser}`,      
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Allow-Origin': '*'
              }
          });
      }

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log("error con token");
            if (error.status==0){
              this.usuService.logOut();
            }
            return throwError(error);            
        })
      );
  }
}
