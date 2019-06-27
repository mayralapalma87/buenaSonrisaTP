import { Especialidad } from './../models/especialidad';
import { Especialistas } from './../models/especialistas';
import { turnoInteface } from './../models/turnoInterface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modalResenaTurno',
  templateUrl: './modalResenaTurno.component.html',
  styleUrls: ['./modalResenaTurno.component.css']
})
export class ModalResenaTurnoComponent implements OnInit {
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
  }
  onSaveTurno(turnoForm: NgForm): void {
      // Update
      debugger;
    this.turno = turnoForm.value;
    this.turno.estado = 'realizado';
    this.dataApi.modificarTurno(this.turno);
    this.turno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
