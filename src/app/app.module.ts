import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { UsuarioserviceService } from './services/usuarioservice.service';
import { HttpClientModule } from '@angular/common/http';
import { HomefoodtruckerComponent } from './components/homefoodtrucker/homefoodtrucker.component';
import { HomeorganizadorComponent } from './components/homeorganizador/homeorganizador.component';
import { NewfoodtruckComponent } from './components/newfoodtruck/newfoodtruck.component';
import { FoodtruckService } from './services/foodtruck.service';
import { ListfoodtrucksComponent } from './components/listfoodtrucks/listfoodtrucks.component';
import { EditFoodTruckComponent } from './edit-food-truck/edit-food-truck.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';
import { ValorarComponent } from './components/valorar/valorar.component';
import { ReservarComponent } from './components/reservar/reservar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EdituserComponent,
    HomefoodtruckerComponent,
    HomeorganizadorComponent,
    NewfoodtruckComponent,
    ListfoodtrucksComponent,
    EditFoodTruckComponent,
    ResultadosBusquedaComponent,
    ValorarComponent,
    ReservarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, NgbModule],
  providers: [UsuarioserviceService, FoodtruckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
