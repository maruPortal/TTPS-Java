import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foodtruck } from 'src/app/model/foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';


@Component({
  selector: 'app-listfoodtrucks',
  templateUrl: './listfoodtrucks.component.html',
  styleUrls: ['./listfoodtrucks.component.css'],
})
export class ListfoodtrucksComponent implements OnInit {
  foodtrucks: Foodtruck[];
  errorMod: Boolean;
  modificado: Boolean;
  errorDel: Boolean;
  eliminado: Boolean;
  sinCambios: Boolean;
  modificandoFt:Boolean;

  nombre: String;
  descripcion: String;
  tipo_servicio: String;
  url: String;
  instagram: String;
  facebook: String;
  whatsapp: String;

  constructor(private ftService: FoodtruckService, private router: Router) {}

  ngOnInit(): void {
    this.getFoodTrucks();
    this.modificandoFt=false;
  }

  getFoodTrucks(){
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

  modificarFoodTruck(idFt: string){
    console.log("Foodtruck: " + idFt);
    sessionStorage.setItem('idFt', idFt);
    this.router.navigateByUrl('edit-foodtruck');

  }
  
  borrarFoodTruck(idFt: string): void{
    console.log("Foodtruck: " + idFt);
    this.ftService.deleteFoodtruck(idFt).subscribe(
      (response) => {
        this.errorDel=false;
        this.eliminado=true;
        this.getFoodTrucks();
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status);
        this.errorDel=true;
        this.eliminado=false;
      }
    );    
  }
}
