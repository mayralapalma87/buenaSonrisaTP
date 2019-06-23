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
  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveTurno(turnoForm: NgForm): void {
    if (turnoForm.value.id == null) {
      // New
      turnoForm.value.userUid = this.userUid;
      this.dataApi.agregarTurno(turnoForm.value);
    } else {
      // Update
      this.dataApi.modificarTurno(turnoForm.value);
    }
    turnoForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
