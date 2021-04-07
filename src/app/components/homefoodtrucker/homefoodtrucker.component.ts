import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-homefoodtrucker, ngbd-dropdown-basic',
  templateUrl: './homefoodtrucker.component.html',
  styleUrls: ['./homefoodtrucker.component.css'],
})
export class HomefoodtruckerComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  change: Boolean;
  decode: Boolean;
  code: String;
  base64textString = [];

  constructor(private userService: UsuarioserviceService,
              private ftService: FoodtruckService,) {}

  ngOnInit(): void {
    this.user_username="felaornella" //tempFela this.user_username = sessionStorage.getItem('username');
    this.user_tipo="FoodTrucker"  //tempFela this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  logOut() {
    this.userService.logOut();
  }

  /*

  METODOS DE PRUEBA PARA EL ENVIO DE IMAGENES EN BASE64, TODAVIA NO ANDA

  onSubmit(login: NgForm) {
    this.change=true;
    this.code=btoa(login.value.image);
    this.ftService.addPic(login,this.base64textString).subscribe(
      (usuario) => {
      },
      (err: HttpErrorResponse) => {
        console.log('estado de error: ', err.status, typeof err.status);
      }
    );
  }

  decodeM(){
    this.decode=true;
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
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }*/

}
