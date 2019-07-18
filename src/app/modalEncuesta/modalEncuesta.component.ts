import { EncuestaInterface } from './../models/encuesta';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/user';

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
  public roles: Roles = {
    admin: false,
    especialista: false,
    cliente: false
  };

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(auth.uid).subscribe(userRole => {
          if (userRole !== undefined) {
            this.roles = userRole.roles;
          }
        });
      }
    });
  }
  onSaveEncuesta(turnoForm: NgForm): void {
      // Update
    this.turno = this.dataApi.selectedTurno;
    this.turno.estado = 'finalizado';
    this.dataApi.modificarTurno(this.turno);
    this.turno = null;
    this.dataApi.selectedTurno = null;
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
