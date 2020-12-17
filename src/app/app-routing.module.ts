import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdituserComponent } from './components/edituser/edituser.component';
import { HomefoodtruckerComponent } from './components/homefoodtrucker/homefoodtrucker.component';
import { HomeorganizadorComponent } from './components/homeorganizador/homeorganizador.component';
import { LoginComponent } from './components/login/login.component';
import { NewfoodtruckComponent } from './components/newfoodtruck/newfoodtruck.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home-organizador', component: HomeorganizadorComponent },
  { path: 'edit-user', component: EdituserComponent },
  { path: 'home-foodtrucker', component: HomefoodtruckerComponent },
  { path: 'new-foodtruck', component: NewfoodtruckComponent },
  { path: '', component: LoginComponent }, //provisorio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
