import { Especialidad } from './../models/especialidad';
import { Especialistas } from './../models/especialistas';
import { turnoInteface } from './../models/turnoInterface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modalResenaTurno',
  templateUrl: './modalResenaTurno.component.html',
  styleUrls: ['./modalResenaTurno.component.css']
})
export class ModalResenaTurnoComponent implements OnInit {
  constructor(public dataApi: DataApiService, private authService:AuthService) {
  }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  public especialistas: Especialistas[];
  public especialista = '';
  public especialidades: Especialidad[];
  public especialidad = '';
  public turno: turnoInteface;
  public isAdmin: any = null;
  public userId: string = null;


  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }
  onSaveTurno(turnoForm: NgForm): void {
      // Update
    this.turno = turnoForm.value;
    this.turno.estado = 'realizado';
    this.dataApi.modificarTurno(this.turno);
    this.turno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
