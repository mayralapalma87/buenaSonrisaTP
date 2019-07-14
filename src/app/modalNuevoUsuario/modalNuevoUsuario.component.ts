import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { UserInterface, Roles } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modalNuevoUsuario',
  templateUrl: './modalNuevoUsuario.component.html',
  styleUrls: ['./modalNuevoUsuario.component.css']
})
export class ModalNuevoUsuarioComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  public usuario: UserInterface;
  public usuarios: UserInterface[];
  rol: Roles = {
    cliente: false,
    especialista: false,
    admin: false
  };
  public selectedRole: any;
  ngOnInit() {
   // this.getUsuarios();
  }
  getUsuarios() {
    this.dataApi.getUsers().subscribe( usuarios => {
      this.usuarios = usuarios;
    });
  }
  setRole(value) {
    if (value === '1') {
     this.rol.cliente = true;
    }
    if (value === '2') {
      this.rol.admin = true;
      this.rol.especialista = true;
    }
    if (value === '3') {
      this.rol.admin = true;
     }
  }
  onSaveUsuario(UsuarioForm: NgForm): void {
    this.usuario = UsuarioForm.value;
    this.usuario.id = this.userId;
    if (UsuarioForm.value.id == null) {
      // New
      this.dataApi.agregarUsuario(this.usuario);
    } else {
      // Update
      this.dataApi.modificarUsuario(this.usuario);
    }
    this.usuario = null;
    UsuarioForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
