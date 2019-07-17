import { UserInterface } from './../models/user';
import { Especialidad } from './../models/especialidad';
import { Especialistas } from './../models/especialistas';
import { turnoInteface } from './../models/turnoInterface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modalNuevoTurno',
  templateUrl: './modalNuevoTurno.component.html',
  styleUrls: ['./modalNuevoTurno.component.css']
})
export class ModalNuevoTurnoComponent implements OnInit {
   constructor(public dataApi: DataApiService, private authService: AuthService) {
  }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  @Input() isAdmin: boolean;
  public especialistas: Especialistas[];
  public especialista = '';
  public especialidades: Especialidad[];
  public especialidad = '';
  public turno: turnoInteface;
  public usuarios: UserInterface[];

  ngOnInit() {
    this.getEspecialidades();
    this.gettUsuarios();
  }
  gettUsuarios() {
    this.dataApi.getUsers().subscribe( users => {
      this.usuarios = users;
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
    if (turnoForm.value.id == null) {
      // New
      this.dataApi.agregarTurno(this.turno);
    } else {
      // Update
      this.dataApi.modificarTurno(this.turno);
    }
    this.turno = null;
    this.dataApi.selectedTurno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
