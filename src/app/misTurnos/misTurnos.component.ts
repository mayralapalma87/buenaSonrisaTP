import { AuthService } from './../services/auth.service';
import { DataApiService } from './../services/data-api.service';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { turnoInteface } from '../models/turnoInterface';
import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { from } from 'rxjs';
import { UserInterface } from '../models/user';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-misTurnos',
  templateUrl: './misTurnos.component.html',
  styleUrls: ['./misTurnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public turnos: turnoInteface[];
  public turnosByUser: turnoInteface[];
  public turno = '';
  public isAdmin: any = null;
  public userId: string = null;
  public cliente: string = null;
  filterBusqueda = '';
  user: UserInterface = {
    id: '',
    nombre: '',
    email: '',
    foto: '',
    roles: {}
  };
  ngOnInit() {
    this.getTurnos();
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(us => {
      if (us) {
        this.userId = us.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          if (userRole !== undefined) {
          this.isAdmin = userRole.roles.admin;
          this.user.roles  = userRole.roles;
          }
          else {
            this.dataApi.getUsers().subscribe( usuarios => {
              for (let us of usuarios) {
                if (us.userId === this.userId) {
                  this.isAdmin = us.roles.admin;
                  this.user.roles  = us.roles;
                  }
                }
            });
          }
        });
      }
    });
  }
  getTurnos() {
    this.dataApi.getTurnos().subscribe( turnos => {
      this.turnos = turnos;
    });
  }

  filterTurnosByUser(user) {
    this.turnos.forEach(function(value) {
      if (value.cliente === user) {
        this.turnosByUser.add(value);
      }
    });
  }
  cancelarTurno(idTurno: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este turno?');
    if (confirmacion) {
      this.dataApi.borrarTurno(idTurno);
    }
  }
  modificarTurno(turno: turnoInteface) {
    this.dataApi.selectedTurno = Object.assign({}, turno);
  }
  public reiniciar() {
    this.turnos = [];
  }
}

