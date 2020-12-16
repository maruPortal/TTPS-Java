import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { UsuarioserviceService } from './services/usuarioservice.service';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
// en la teoria es HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EdituserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UsuarioserviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
