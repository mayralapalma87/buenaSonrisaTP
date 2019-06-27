import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';

@Component({
  selector: 'app-agendaEspecialista',
  templateUrl: './agendaEspecialista.component.html',
  styleUrls: ['./agendaEspecialista.component.css']
})
export class AgendaEspecialistaComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public turnos: turnoInteface[];
  public turnosByUser: turnoInteface[];
  public turno = '';

  ngOnInit() {
    this.getTurnos();
  }
  getTurnos() {
    this.dataApi.getTurnos().subscribe( turnos => {
      this.turnos = turnos;
    });
  }

  filterTurnosByUser(user) {
    this.turnos.forEach(function(value) {
      if (value.cliente == user) {
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
  llenarEncuesta(turnoId){

  }
  public reiniciar() {
    this.turnos = [];
  }
}
