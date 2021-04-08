import { Component, OnInit, } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Foodtruck } from 'src/app/model/foodtruck';

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
    config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

  ngOnInit(): void {
    this.user_tipo="Organizador";
    this.user_username="felaornella";
    this.url_home="home-" + this.user_tipo.toLowerCase();
    console.log(this.url_home);

    this.eventos.push(new Evento("1","El Callejón1", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("2","El Callejón2", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("3","El Callejón3", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("4","El Callejón4", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("5","El Callejón5", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("6","El Callejón6", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("7","El Callejón7", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
    this.eventos.push(new Evento("8","El Callejón8", "Calle 10, 598",1900,"La Plata, Buenos Aires"," ","25 Ene. 2021 - 13hs","prueba@hotmail.com","2216042101","El mejor evento de la ciudad","Gastronomico","Clientes") );
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
}
