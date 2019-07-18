import { Especialidad } from './../models/especialidad';
import { Especialistas } from './../models/especialistas';
import { turnoInteface } from './../models/turnoInterface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/user';

@Component({
  selector: 'app-modalResenaTurno',
  templateUrl: './modalResenaTurno.component.html',
  styleUrls: ['./modalResenaTurno.component.css']
})
export class ModalResenaTurnoComponent implements OnInit {
  constructor(public dataApi: DataApiService, private authService: AuthService) {
  }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  @Input() isAdmin: any;
  public turno: turnoInteface;
  public useruId: string = null;
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
        this.useruId = auth.uid;
        this.authService.isUserAdmin(auth.uid).subscribe(userRole => {
          if (userRole !== undefined) {
            this.roles = userRole.roles;
          }
          else {
            this.dataApi.getUsers().subscribe( usuarios => {
              for (let us of usuarios) {
                if (us.userId === this.userId) {
                  this.isAdmin = us.roles.admin;
                  this.roles  = us.roles;
                  }
                }
            });
          }
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
