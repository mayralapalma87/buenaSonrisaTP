import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { UserInterface, Roles } from '../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';

@Component({
  selector: 'app-modalNuevoUsuario',
  templateUrl: './modalNuevoUsuario.component.html',
  styleUrls: ['./modalNuevoUsuario.component.css']
})
export class ModalNuevoUsuarioComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(public dataApi: DataApiService, private router: Router, private authservice: AuthService, private storage: AngularFireStorage) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  @ViewChild('imageUser') inpupImageUser: ElementRef;
  public usuarios: UserInterface[];
  rol: Roles = {
    cliente: false,
    especialista: false,
    admin: false
  };
  error = '';
  haveError = false;
  public selectedRole: any;
  public isAdmin: any = null;
  public isLogged = false;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public especialidades: Especialidad[];
  public especialidad = '';

  ngOnInit() {
   // this.getUsuarios();
   this.getEspecialidades();
  }
  getUsuarios() {
    this.dataApi.getUsers().subscribe( usuarios => {
      this.usuarios = usuarios;
    });
  }
  getEspecialidades() {
    this.dataApi.getEspecialidades().subscribe( especialidades => {
      this.especialidades = especialidades;
    });
  }
  setRole(value) {
    if (value === '1') {
     this.rol.cliente = true;
    }
    if (value === '2') {
      this.rol.especialista = true;
    }
    if (value === '3') {
      this.rol.admin = true;
     }
  }
  onSaveUsuario(UsuarioForm: NgForm): void {
    this.dataApi.selectedUser.roles = this.rol;
    if (this.dataApi.selectedUser.id == null) {
      this.dataApi.agregarUsuario(this.dataApi.selectedUser);
    } else {
      // Update
      this.dataApi.modificarUsuario(this.dataApi.selectedUser);
    }
    this.dataApi.selectedUser = null;
    UsuarioForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
