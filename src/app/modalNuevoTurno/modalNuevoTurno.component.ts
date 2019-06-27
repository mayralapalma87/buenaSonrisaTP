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
  @Input() userUid: string;
  public especialistas: Especialistas[];
  public especialista = '';
  public especialidades: Especialidad[];
  public especialidad = '';
  public turno: turnoInteface;

  ngOnInit() {
    this.getEspecialistas();
    this.getEspecialidades();

  }
  getEspecialistas() {
    this.dataApi.getEspecialistas().subscribe( especialistas => {
      this.especialistas = especialistas;
      console.log('especialistas:', this.especialistas);
    });
  }
  getEspecialidades() {
    this.dataApi.getEspecialidades().subscribe( especialidades => {
      this.especialidades = especialidades;
      console.log('especialidades:', this.especialidades);
    });
  }
  onSaveTurno(turnoForm: NgForm): void {
    if (turnoForm.value.id == null) {
      // New
      this.turno = turnoForm.value;
      this.turno.fecha_hora = turnoForm.value.fecha_hora;
      this.turno.estado = 'reservado';
      this.dataApi.agregarTurno(this.turno);
    } else {
      // Update
      this.turno = turnoForm.value;
      this.turno.fecha_hora = turnoForm.value.fecha_hora;
      this.turno.estado = 'reservado';
      this.dataApi.modificarTurno(this.turno);
    }
    this.turno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
