import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';


@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NeweventComponent implements OnInit {
  enviado: Boolean;
  error: Boolean;
  constructor(
    private ftservice: FoodtruckService,
    private userService: UsuarioserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.userService.isFoodtrucker();

    this.enviado = false;
    this.error = false;
  }

  onSubmit(ft: NgForm) {
    let estado = this.ftservice.createFoodtruck(ft);
    console.log(estado);
    if (estado == 'Fallido') {
      this.enviado = false;
      this.error = true;
    } else {
      this.router.navigateByUrl('list-foodtrucks');
      this.enviado = true;
      this.error = false;
    }
  }

  logOut() {
    this.userService.logOut();
  }

}
