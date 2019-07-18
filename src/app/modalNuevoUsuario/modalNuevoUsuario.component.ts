import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { UserInterface, Roles } from '../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
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
  public especialidades: Especialidad[];
  public especialidad = '';
  public usuarios: UserInterface[];
  rol: Roles = {
    cliente: false,
    especialista: false,
    admin: false
  };
  public selectedRole: any;
  public isAdmin: any = null;
  public isLogged = false;
  error = '';
  haveError = false;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

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
      this.dataApi.selectedUser.roles.cliente = true;
    }
    if (value === '2') {
      this.dataApi.selectedUser.roles.especialista = true;
    }
    if (value === '3') {
      this.dataApi.selectedUser.roles.admin = true;
     }
  }
  onSaveUsuario(UsuarioForm: NgForm): void {
    this.dataApi.selectedUser.creacionAdmin = true;
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
