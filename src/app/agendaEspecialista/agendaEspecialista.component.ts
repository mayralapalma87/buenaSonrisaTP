import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { faHollyBerry } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agendaEspecialista',
  templateUrl: './agendaEspecialista.component.html',
  styleUrls: ['./agendaEspecialista.component.css']
})
export class AgendaEspecialistaComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public turnos: turnoInteface[];
  public turnosByUser: turnoInteface[];
  public turno: '';
  public turnoCancel: turnoInteface ={};
  public hoy = new Date();
  public hoyText = this.hoy.toDateString(); //getFullYear().toString() + (this.hoy.getMonth() + 1 ).toString() + this.hoy.getDay().toString();

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
      this.turnoCancel.id = idTurno;
      this.turnoCancel.estado = 'ausente';
      this.dataApi.modificarTurno(this.turnoCancel);
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
  evaluarFecha(turno: turnoInteface){debugger;
    var fechanum;
    if(typeof(turno.fecha_hora.seconds) !== 'undefined')
      fechanum = turno.fecha_hora.seconds* 1000;
    var value = fechanum? new Date(fechanum): new Date(turno.fecha_hora);
    var turnoFecha = (value).toDateString()//turno.fecha_hora.toString().replace("-","").replace("/","");
     return (turnoFecha.indexOf(this.hoyText) !== -1);
  }
}
