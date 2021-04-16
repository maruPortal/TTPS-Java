import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-newfoodtruck, ngbd-dropdown-basic',
  templateUrl: './newfoodtruck.component.html',
  styleUrls: ['./newfoodtruck.component.css'],
  styles: [
    `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
})
export class NewfoodtruckComponent implements OnInit {
  enviado: Boolean;
  error: Boolean;
  user_tipo="FoodTrucker";
  imgFoodTruck = [];
  corteImg: Boolean;

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
    this.corteImg = false;
    if(this.checkImg()){
      if (this.checkFt(ft)){
        this.ftservice.createFoodtruck(ft,this.imgFoodTruck);
      }else{
        console.log("Completa todo")
      }
    }else{
      console.log("Subi alguna foto")
    } 
    
  }

  checkImg(){
    return this.imgFoodTruck.length>0;
  }

  checkFt(ft){
    let nombre = ft.value.nombre.trim();
    let tipo = ft.value.tipo_servicio.trim();
    let url = ft.value.url.trim();
    let desc = ft.value.descripcion.trim();
    let ig = ft.value.instagram.trim();
    let fb = ft.value.facebook.trim();
    let cond2 = ((((((nombre.length > 0 && tipo.length > 0 )&& url.length > 0) && desc.length > 0) && ig.length > 0 )&& fb.length > 0));
    return cond2;
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
    this.imgFoodTruck.push('data:image/png;base64,' + btoa(e.target.result));
    if (this.imgFoodTruck.length == 3){
      this.corteImg = true;
    }
    
  }

}
