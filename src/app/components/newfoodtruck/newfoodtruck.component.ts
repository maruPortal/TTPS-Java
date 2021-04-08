import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-newfoodtruck, ngbd-dropdown-basic',
  templateUrl: './newfoodtruck.component.html',
  styleUrls: ['./newfoodtruck.component.css'],
})
export class NewfoodtruckComponent implements OnInit {
  enviado: Boolean;
  error: Boolean;
  user_tipo="FoodTrucker";
  imgFoodTruck: String;

  constructor(
    private ftservice: FoodtruckService,
    private userService: UsuarioserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.isFoodtrucker();

    this.enviado = false;
    this.error = false;
  }

  // {"dueño":{ "id":1} }
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

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.imgFoodTruck=('data:image/png;base64,' + btoa(e.target.result));
  }

}
