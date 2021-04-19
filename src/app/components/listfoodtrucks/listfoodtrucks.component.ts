import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foodtruck } from 'src/app/model/foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listfoodtrucks, ngbd-dropdown-basic, ngbd-modal-config',
  templateUrl: './listfoodtrucks.component.html',
  styleUrls: ['./listfoodtrucks.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ListfoodtrucksComponent implements OnInit {
  foodtrucks = [];
  user_username: String;
  user_tipo: String;

  constructor(
    private ftService: FoodtruckService,
    private router: Router,
    private userService: UsuarioserviceService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userService.isFoodtrucker();
    this.getFoodTrucks();
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  open(content) {
    this.modalService.open(content);
  }

  getFoodTrucks() {
    this.ftService.getFoodtrucks().subscribe(
      (listaFTrucks) => {
        console.log(listaFTrucks);
        this.foodtrucks = listaFTrucks.reverse();
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

  borrarFoodTruck(ft: Foodtruck): void {
    this.modalService.dismissAll();
    ft.eliminado = 1;
    this.ftService.deleteFoodtruck(ft).subscribe(
      () => {
        this.toastr.success(
          'Foodtruck elimando con exito',
          'Foodtruck Eliminado'
        );
        this.foodtrucks.splice(this.foodtrucks.indexOf(ft),1);
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
        this.toastr.error(
          'Error al eliminar el foodtruck:  ' + err.status,
          'Error'
        );
      }
    );
  }

  logOut() {
    this.userService.logOut();
  }
}
