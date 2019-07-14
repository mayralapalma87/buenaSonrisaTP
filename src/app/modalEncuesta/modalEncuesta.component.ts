import { EncuestaInterface } from './../models/encuesta';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modalEncuesta',
  templateUrl: './modalEncuesta.component.html',
  styleUrls: ['./modalEncuesta.component.css']
})
export class ModalEncuestaComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dataApi: DataApiService, private authService: AuthService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  public turno: turnoInteface;
  public isAdmin: any = null;
  public userId: string = null;

  public encuesta: EncuestaInterface = {
    id : '',
    userId : '',
    idTurno : '',
    puntajeEspecialista: 0,
    puntajeClinica: 0,
    review : ''
  };

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
  onSaveEncuesta(turnoForm: NgForm): void {
      // Update
    this.turno = turnoForm.value;
    this.turno.encuesta = this.encuesta;
    this.dataApi.modificarTurno(this.turno);
    this.turno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
