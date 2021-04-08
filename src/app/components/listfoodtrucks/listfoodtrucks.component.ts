import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foodtruck } from 'src/app/model/foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-listfoodtrucks, ngbd-dropdown-basic, ngbd-modal-config',
  templateUrl: './listfoodtrucks.component.html',
  styleUrls: ['./listfoodtrucks.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListfoodtrucksComponent implements OnInit {
  foodtrucks= [];
  modificado: Boolean;
  errorDel: Boolean;
  eliminado: Boolean;
  sinCambios: Boolean;

  user_username: String;
  user_tipo: String;

  constructor(
    private ftService: FoodtruckService,
    private router: Router,
    private userService: UsuarioserviceService,
    config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

  ngOnInit(): void {
    this.userService.isFoodtrucker();
    this.getFoodTrucks();
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
    this.foodtrucks.push(new Foodtruck("1","Gin Bar","Cocteleria","El bar movil ideal para tu evento","www.ginbar.com.ar","@ginbar.truck"));
    
    let estadoModif = sessionStorage.getItem('estadoModificacion');
    if (estadoModif == 'ModificadoExitosamente') {
      this.modificado = true;
    } else {
      if (estadoModif == 'SinCambios') {
        this.sinCambios = true;
      } else {
        this.sinCambios = false;
        this.modificado = false;
      }
    }
    sessionStorage.setItem('estadoModificacion', '');
  }

  open(content) {
    this.modalService.open(content);
  }

  getFoodTrucks() {
    this.ftService.getFoodtrucks().subscribe(
      (listaFTrucks) => {
        console.log(listaFTrucks);
        this.foodtrucks = listaFTrucks;
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
      }
    );
  }

  modificarFoodTruck(idFt: string) {
    console.log('Foodtruck: ' + idFt);
    sessionStorage.setItem('idFt', idFt);
    this.router.navigateByUrl('edit-foodtruck');
  }

  borrarFoodTruck(idFt: string): void {
    
    this.foodtrucks.splice(this.foodtrucks.indexOf(this.foodtrucks.find(element => element.id == idFt)),1);
    this.modalService.dismissAll();


    this.sinCambios = false;
    console.log('Foodtruck: ' + idFt);
    this.ftService.deleteFoodtruck(idFt).subscribe(
      (response) => {
        this.errorDel = false;
        this.eliminado = true;
        this.getFoodTrucks();
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
        this.errorDel = true;
        this.eliminado = false;
      }
    );
  }

  logOut() {
    this.userService.logOut();
  }
}
