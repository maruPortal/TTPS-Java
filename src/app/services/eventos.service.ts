import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../model/evento';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  constructor(private http: HttpClient, private router: Router) {}

  crearEvento(evento): Observable<Evento> {
    return this.http.post<Evento>(`${environment.url}/eventos`, evento);
  }
}
