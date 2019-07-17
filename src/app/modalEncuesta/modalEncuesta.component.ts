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
  @Input() userId: string;
  @Input() isAdmin: any;
  public turno: turnoInteface;
  public userUid: string = null;

  public encuesta: EncuestaInterface = {
    id : '',
    userId : '',
    user: '',
    especialista: '',
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
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = userRole.roles.admin;
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
