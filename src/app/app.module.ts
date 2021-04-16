import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { UsuarioserviceService } from './services/usuarioservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ListeventosComponent } from './components/listeventos/listeventos.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { EditEventoComponent } from './components/edit-evento/edit-evento.component';
import { JwtInterceptorInterceptor } from './helpers/jwt-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

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
    ListeventosComponent,
    NeweventComponent,
    EditEventoComponent,
  ],
  imports: [BrowserModule, 
            AppRoutingModule, 
            FormsModule, 
            HttpClientModule, 
            NgbModule, 
            BrowserAnimationsModule,
            //LeafletModule.forRoot()
            LeafletModule
          ],
  providers: [UsuarioserviceService, FoodtruckService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
