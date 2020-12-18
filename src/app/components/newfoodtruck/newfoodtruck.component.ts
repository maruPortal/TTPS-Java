import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-newfoodtruck',
  templateUrl: './newfoodtruck.component.html',
  styleUrls: ['./newfoodtruck.component.css'],
})
export class NewfoodtruckComponent implements OnInit {
  enviado: Boolean;
  error: Boolean;
  constructor(private ftservice: FoodtruckService) {}

  ngOnInit(): void {
    this.enviado=false;
    this.error=false;
  }

  // {"dueño":{ "id":1} }
  onSubmit(ft: NgForm) {
    let estado= this.ftservice.createFoodtruck(ft);
    console.log(estado);
    if (estado == "Fallido"){
      this.enviado=false;
      this.error=true;
    }else{
      this.enviado=true;
      this.error=false;
    }
  }
}
