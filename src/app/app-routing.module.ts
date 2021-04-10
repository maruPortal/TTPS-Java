import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdituserComponent } from './components/edituser/edituser.component';
import { HomefoodtruckerComponent } from './components/homefoodtrucker/homefoodtrucker.component';
import { HomeorganizadorComponent } from './components/homeorganizador/homeorganizador.component';
import { ListfoodtrucksComponent } from './components/listfoodtrucks/listfoodtrucks.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';
import { LoginComponent } from './components/login/login.component';
import { NewfoodtruckComponent } from './components/newfoodtruck/newfoodtruck.component';
import { RegisterComponent } from './components/register/register.component';
import { EditFoodTruckComponent } from './edit-food-truck/edit-food-truck.component';
import { CanActivateGuard } from './guarda/can-activate.guard';
import { ValorarComponent } from './components/valorar/valorar.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { ListeventosComponent } from './components/listeventos/listeventos.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { EditEventoComponent } from './components/edit-evento/edit-evento.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home-organizador',
    component: HomeorganizadorComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'edit-user',
    component: EdituserComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'home-foodtrucker',
    component: HomefoodtruckerComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'new-foodtruck',
    component: NewfoodtruckComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'new-event',
    component: NeweventComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'list-foodtrucks',
    component: ListfoodtrucksComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'list-eventos',
    component: ListeventosComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'edit-foodtruck',
    component: EditFoodTruckComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'edit-evento',
    component: EditEventoComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'search-result',
    component: ResultadosBusquedaComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'valorarReserva',
    component: ValorarComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'reservar',
    component: ReservarComponent,
    canActivate: [CanActivateGuard],
  },

  { path: '**', component: LoginComponent }, //provisorio -> 404
  // { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
