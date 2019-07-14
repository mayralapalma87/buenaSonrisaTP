import { ClienteInterface } from './../models/ClienteInterface';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../services/data-api.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-modalNuevoCliente',
  templateUrl: './modalNuevoCliente.component.html',
  styleUrls: ['./modalNuevoCliente.component.css']
})
export class ModalNuevoClienteComponent implements OnInit {
  constructor(public dataApi: DataApiService) {
  }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  public Cliente: ClienteInterface = {
    id: null,
    userId: null,
    nombre: '',
    apellido: '',
    telefono: '',
    tipoPaciente: null,
    email: '',
    obraSocial: null,
    nroCarnet: null
  };
  ngOnInit() {
  }

  onSaveCliente(ClienteForm: NgForm): void {
    this.Cliente = ClienteForm.value;
    if (ClienteForm.value.id == null) {
      // New
      this.dataApi.agregarCliente(this.Cliente);
    } else {
      // Update
      this.dataApi.modificarCliente(this.Cliente);
    }
    this.Cliente = null;
    ClienteForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
