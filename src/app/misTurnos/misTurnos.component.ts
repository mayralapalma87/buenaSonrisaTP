import { DataApiService } from './../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { turnoInteface } from '../models/turnoInterface';
import { NgForm } from '@angular/forms';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-misTurnos',
  templateUrl: './misTurnos.component.html',
  styleUrls: ['./misTurnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public turnos: turnoInteface[];
  public turno = '';

  ngOnInit() {
    this.getTurnos();
  }
  getTurnos() {
    this.dataApi.getTurnos().subscribe( turnos => {
      this.turnos = turnos;
    });
  }
  nuevoTurno() {
    // tslint:disable-next-line: no-debugger
    //$('#modalNuevoTurno').modal('toggle');
  }
  cancelarTurno() {
  }
  modificarTurno() {
  }
  agregarTurno() {
  }
  public reiniciar() {
    this.turnos = [];
  }
}
