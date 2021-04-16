import { Component, OnInit, } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Foodtruck } from 'src/app/model/foodtruck';
import { EventosService } from 'src/app/services/eventos.service';
import { ToastrService } from 'ngx-toastr';
import { Http2SecureServer } from 'node:http2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listeventos,  ngbd-modal-config',
  templateUrl: './listeventos.component.html',
  styleUrls: ['./listeventos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListeventosComponent implements OnInit {
  foodtrucks: Foodtruck[];
  
  user_username: String;
  user_tipo: String;
  url_home: String;
  eventos=[];
  constructor(
    private router: Router,
    private userService: UsuarioserviceService,
    private evService: EventosService,
    private toastr: ToastrService,
    config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

  ngOnInit(): void {
    this.userService.isOrganizador();
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
    this.toastr.success("Evento eliminado con exito","Evento Eliminado");
    //implementar metodo de borrado con la api en evento service
  }

  getEventos(){
    this.evService.recuperarEventos().subscribe(
      (listRes) => {
        this.eventos=listRes.reverse();
      },
      (err: HttpErrorResponse)=>{
        this.toastr.error("Error al recuperar mis eventos","Error")
      }
    )
  }
}
