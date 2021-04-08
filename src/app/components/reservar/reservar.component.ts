import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Foodtruck } from 'src/app/model/foodtruck';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ReservarComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  modalActivo: Boolean;
  foodtruck: Foodtruck;
  eventos=[];
  modalSeleccion: Boolean;
  eventoSeleccionado: Evento;
  haySeleccion: Boolean;
  constructor(private userService: UsuarioserviceService,
    private ftService: FoodtruckService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.haySeleccion=false;
    this.foodtruck = new Foodtruck("1","Gin Bar","Cocteleria","El bar movil ideal para tu evento","www.ginbar.com.ar","@ginbar.truck");
    this.eventos.push(new Evento("1","El Callejón1", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón2", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón3", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón4", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón5", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón6", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón7", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.eventos.push(new Evento("1","El Callejón8", "Calle 10, 598",1900,"La Plata, Buenos Aires","","25 Ene. 2021 - 13hs") );
    this.user_username="felaornella" //tempFela this.user_username = sessionStorage.getItem('username');
    this.user_tipo="Organizador"  //tempFela this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  logOut() {
    this.userService.logOut();
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  marcarSeleccionado(ev){
    this.eventoSeleccionado=ev;
    this.haySeleccion=true;
    this.modalService.dismissAll();
  }

  cancelar(){
    this.router.navigateByUrl("/home-organizador");
  }

  confirmarReserva(){
    
  }

}
