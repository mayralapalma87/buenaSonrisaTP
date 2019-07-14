import { Especialidad } from './../models/especialidad';
import { Especialistas } from './../models/especialistas';
import { turnoInteface } from './../models/turnoInterface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modalNuevoTurno',
  templateUrl: './modalNuevoTurno.component.html',
  styleUrls: ['./modalNuevoTurno.component.css']
})
export class ModalNuevoTurnoComponent implements OnInit {
   constructor(public dataApi: DataApiService) {
  }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  @Input() cliente: string;
  public especialistas: Especialistas[];
  public especialista = '';
  public especialidades: Especialidad[];
  public especialidad = '';
  public turno: turnoInteface;
  //public hoy: new Date();

  ngOnInit() {
    this.getEspecialistas();
    this.getEspecialidades();
  }
  getEspecialistas() {
    this.dataApi.getEspecialistas().subscribe( especialistas => {
      this.especialistas = especialistas;
    });
  }
  getEspecialidades() {
    this.dataApi.getEspecialidades().subscribe( especialidades => {
      this.especialidades = especialidades;
    });
  }
  onSaveTurno(turnoForm: NgForm): void {
    this.turno = turnoForm.value;
    this.turno.userId = this.userId;
    this.turno.estado = 'reservado';
    if(typeof(this.cliente) !== 'undefined') {
      this.turno.cliente = this.cliente;
    }
    if (turnoForm.value.id == null) {
      // New
      this.dataApi.agregarTurno(this.turno);
    } else {
      // Update
      this.dataApi.modificarTurno(this.turno);
    }
    this.turno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
