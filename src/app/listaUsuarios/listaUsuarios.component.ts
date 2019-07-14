import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-listaUsuarios',
  templateUrl: './listaUsuarios.component.html',
  styleUrls: ['./listaUsuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService, private route: ActivatedRoute) { }
  public usuarios: UserInterface[];
  public isAdmin: any = null;
  public userId: string = null;
  public usuariosModal: UserInterface[] = [];
  public filter = '';

  ngOnInit() {
    this.getUsuarios();
    this.getCurrentUser();
    this.filter = this.route.snapshot.params['filter'];
  }
  getUsuarios() {
    this.dataApi.getUsers().subscribe( usuarios => {
      this.usuarios = usuarios;
    });
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = userRole.roles.admin;
        });
      }
    });
  }

  cancelarUsuario(idUser: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este usuario?');
    if (confirmacion) {
      this.dataApi.borrarTurno(idUser);
    }
  }
  modificarUsuario(user: UserInterface) {
    debugger;
    this.dataApi.selectedUser = Object.assign({}, user);
  }
  mostrarDatos(usuarios) {
    console.log(usuarios);
    this.usuariosModal = usuarios;
    ( $('#modalBusqueda') as any).modal('show');
  }
}
