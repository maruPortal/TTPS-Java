import { Component, OnInit, } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Foodtruck } from 'src/app/model/foodtruck';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-listeventos,  ngbd-modal-config',
  templateUrl: './listeventos.component.html',
  styleUrls: ['./listeventos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListeventosComponent implements OnInit {
  foodtrucks: Foodtruck[];
  modificado: Boolean;
  errorDel: Boolean;
  eliminado: Boolean;
  sinCambios: Boolean;
  
  user_username: String;
  user_tipo: String;
  url_home: String;
  eventos=[];
  constructor( private ftService: FoodtruckService,
    private router: Router,
    private userService: UsuarioserviceService,
    private evService: EventosService,
    config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

  ngOnInit(): void {
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.url_home="home-" + this.user_tipo.toLowerCase();
    console.log(this.url_home);
    this.getEventos();
  }

  logOut() {
    this.userService.logOut();
  }

  open(content) {
    this.modalService.open(content);
  }

  borrarEvento(ftId){
    
    console.log(this.eventos.find(element => element.id == ftId));
    let index=this.eventos.indexOf(this.eventos.find(element => element.id == ftId));
    console.log("Index: " + index);
    this.eventos.splice(index,1);
    this.modalService.dismissAll();
  }

  getEventos(){
    this.evService.recuperarEventos().subscribe(
      (listRes) => {
        console.log("Cantidad de eventos: " + listRes.length);
        this.eventos=listRes.reverse();
      }
    )
  }
}
