import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { MiPerfilComponent } from './miPerfil/miPerfil.component';
import { MisTurnosComponent } from './misTurnos/misTurnos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NuevoTurnoComponent } from './nuevoTurno/nuevoTurno.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'registrarse' , component: RegistrarseComponent},
  {path: 'miPerfil', component: MiPerfilComponent},
  {path: 'misTurnos', component: MisTurnosComponent},
  {path: 'navbar' , component: NavbarComponent},
  {path: 'nuevoTurno' , component: NuevoTurnoComponent},
  {path: 'error' , component: ErrorComponent},
  {path: '**' , component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
