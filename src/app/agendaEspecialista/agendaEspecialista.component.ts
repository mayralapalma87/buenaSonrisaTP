import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/user';

@Component({
  selector: 'app-agendaEspecialista',
  templateUrl: './agendaEspecialista.component.html',
  styleUrls: ['./agendaEspecialista.component.css']
})
export class AgendaEspecialistaComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public turnos: turnoInteface[];
  public turno: '';
  public turnoCancel: turnoInteface = {};
  public hoy = new Date();
  public hoyText = this.hoy.toDateString();
  public isAdmin: any = null;
  public userId: string = null;
  public rol: Roles = {
    admin: false,
    especialista: false,
    cliente: false
  };
  ngOnInit() {
    this.getTurnos();
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.authService.isUserAdmin(auth.uid).subscribe(userRole => {
          if (userRole !== undefined) {
            this.isAdmin = userRole.roles.admin;
            this.rol  = userRole.roles;
          }
          else {
            this.dataApi.getUsers().subscribe( usuarios => {
              for (let us of usuarios) {
                if (us.userId === this.userId) {
                  this.isAdmin = us.roles.admin;
                  this.rol  = us.roles;
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

  cancelarTurno(idTurno: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este turno?');
    if (confirmacion) {
      this.turnoCancel.id = idTurno;
      this.turnoCancel.estado = 'ausente';
      this.dataApi.modificarTurno(this.turnoCancel);
    }
  }
  modificarTurno(turno: turnoInteface) {
    this.dataApi.selectedTurno = Object.assign({}, turno);
  }
  public reiniciar() {
    this.turnos = [];
  }
  evaluarFecha(turno: turnoInteface) {
    let fechanum;
    if (typeof(turno.fecha_hora.seconds) !== 'undefined') {
      fechanum = turno.fecha_hora.seconds * 1000;
    }
    let value = fechanum ? new Date(fechanum) : new Date(turno.fecha_hora);
    let turnoFecha = (value).toDateString();
    return (turnoFecha.indexOf(this.hoyText) !== -1);
  }
}
