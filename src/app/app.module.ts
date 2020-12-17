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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EdituserComponent,
    HomefoodtruckerComponent,
    HomeorganizadorComponent,
    NewfoodtruckComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UsuarioserviceService, FoodtruckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
