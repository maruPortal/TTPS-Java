import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ControlContainer } from '@angular/forms';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // agrego Authorization Header con jwt token si esta disponible
      let currentUser = localStorage.getItem("token");
      console.log("tko: " + currentUser);
      console.log("tko: " + `${currentUser}`)
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

      return next.handle(request);
  }
}
