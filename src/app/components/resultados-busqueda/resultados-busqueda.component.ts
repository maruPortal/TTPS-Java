import { Component, OnInit } from '@angular/core';
import { UsuarioserviceService } from 'src/app/services/usuarioservice.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { Foodtruck } from 'src/app/model/foodtruck';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css']
})
export class ResultadosBusquedaComponent implements OnInit {
  user_username: String;
  user_tipo: String;
  images = [62, 83, 466, 965, 982, 1043, 738,62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  restante=[];
  fts=[];
  constructor(private userService: UsuarioserviceService,
              private ftService: FoodtruckService,
              private router: Router,
              public activatedRoute: ActivatedRoute) { 

    }
  

  ngOnInit(): void {
    this.fts = window.history.state.resultados;
    if (this.fts==null){
      this.router.navigateByUrl('/');
    }
    this.restante = new Array((Math.ceil(this.images.length / 5))*5 - this.images.length);
    console.log((Math.ceil(this.images.length / 5))*5 - this.images.length);
    this.user_username = sessionStorage.getItem('username');
    this.user_tipo = sessionStorage.getItem('tipoUsuario');
  }

  logOut() {
    this.userService.logOut();
  }

}
