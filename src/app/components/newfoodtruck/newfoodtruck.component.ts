import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-newfoodtruck',
  templateUrl: './newfoodtruck.component.html',
  styleUrls: ['./newfoodtruck.component.css'],
})
export class NewfoodtruckComponent implements OnInit {
  constructor(private ftservice: FoodtruckService) {}

  ngOnInit(): void {}

  // {"dueño":{ "id":1} }
  onSubmit(ft: NgForm) {
    this.ftservice.createFoodtruck(ft);
  }
}
