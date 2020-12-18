import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foodtruck } from 'src/app/model/foodtruck';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';

@Component({
  selector: 'app-listfoodtrucks',
  templateUrl: './listfoodtrucks.component.html',
  styleUrls: ['./listfoodtrucks.component.css'],
})
export class ListfoodtrucksComponent implements OnInit {
  foodtrucks: Foodtruck[];

  constructor(
    private userService: UsuarioserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
