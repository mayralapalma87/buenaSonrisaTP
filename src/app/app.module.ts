import { FilterBusquedaPipe } from './Pipes/filterBusqueda.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { NuevoTurnoComponent } from './nuevoTurno/nuevoTurno.component';
import { AgendaEspecialistaComponent } from './agendaEspecialista/agendaEspecialista.component';
import { MenuRecepcionComponent } from './menuRecepcion/menuRecepcion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MisTurnosComponent } from './misTurnos/misTurnos.component';
import { MiPerfilComponent } from './miPerfil/miPerfil.component';
import { HomeComponent } from './home/home.component';
import { ModalNuevoTurnoComponent } from './modalNuevoTurno/modalNuevoTurno.component';
import { environment } from 'src/environments/environment';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { ModalResenaTurnoComponent } from './modalResenaTurno/modalResenaTurno.component';
import { ModalEncuestaComponent } from './modalEncuesta/modalEncuesta.component';
import { ListaUsuariosComponent } from './listaUsuarios/listaUsuarios.component';
import { ModalNuevoUsuarioComponent } from './modalNuevoUsuario/modalNuevoUsuario.component';
import { ModalBusquedaComponent } from './modalBusqueda/modalBusqueda.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { Pipe, PipeTransform } from '@angular/core';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      ErrorComponent,
      RegistrarseComponent,
      NuevoTurnoComponent,
      AgendaEspecialistaComponent,
      MenuRecepcionComponent,
      NavbarComponent,
      MisTurnosComponent,
      MiPerfilComponent,
      HomeComponent,
      ModalNuevoTurnoComponent,
      EncuestaComponent,
      ModalResenaTurnoComponent,
      ModalEncuestaComponent,
      ListaUsuariosComponent,
      ModalNuevoUsuarioComponent,
      ModalBusquedaComponent,
      BusquedaComponent,
      FilterBusquedaPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireStorageModule,
   ],
   exports: [
      FilterBusquedaPipe
   ],
   providers: [
      AngularFireAuth,
      AngularFirestore,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}

