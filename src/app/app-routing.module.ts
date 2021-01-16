import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdituserComponent } from './components/edituser/edituser.component';
import { HomefoodtruckerComponent } from './components/homefoodtrucker/homefoodtrucker.component';
import { HomeorganizadorComponent } from './components/homeorganizador/homeorganizador.component';
import { ListfoodtrucksComponent } from './components/listfoodtrucks/listfoodtrucks.component';
import { LoginComponent } from './components/login/login.component';
import { NewfoodtruckComponent } from './components/newfoodtruck/newfoodtruck.component';
import { RegisterComponent } from './components/register/register.component';
import { EditFoodTruckComponent } from './edit-food-truck/edit-food-truck.component';
// import { CanActivateGuard } from './guarda/can-activate.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home-organizador',
    component: HomeorganizadorComponent,
    // canActivate: [CanActivateGuard],
  },
  {
    path: 'edit-user',
    component: EdituserComponent,
    // canActivate: [CanActivateGuard],
  },
  {
    path: 'home-foodtrucker',
    component: HomefoodtruckerComponent,
    // canActivate: [CanActivateGuard],
  },
  {
    path: 'new-foodtruck',
    component: NewfoodtruckComponent,
    // canActivate: [CanActivateGuard],
  },
  {
    path: 'list-foodtrucks',
    component: ListfoodtrucksComponent,
    // canActivate: [CanActivateGuard],
  },
  {
    path: 'edit-foodtruck',
    component: EditFoodTruckComponent,
    // canActivate: [CanActivateGuard],
  },
  { path: '', component: LoginComponent }, //provisorio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
