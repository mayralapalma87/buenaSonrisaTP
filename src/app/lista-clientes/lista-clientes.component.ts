import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { AuthService } from '../services/auth.service';
import { ClienteInterface } from '../models/ClienteInterface';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService:AuthService) { }
  public Clientes: ClienteInterface[];
  public ClientesByUser: ClienteInterface[];
  public Cliente = '';
  public isAdmin: any = null;
  public userId: string = null;
  public cliente: string = null;

  ngOnInit() {
    this.getClientes();
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
  getClientes() {
    this.dataApi.getClientes().subscribe( Clientes => {
      this.Clientes = Clientes;
    });
  }

  /* filterClientesByUser(user) {
    this.Clientes.forEach(function(value) {
      if (value.cliente == user) {
        this.ClientesByUser.add(value);
      }
    });
  } */
  cancelarCliente(idCliente: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este Cliente?');
    if (confirmacion) {
      this.dataApi.borrarCliente(idCliente);
    }
  }
  modificarCliente(Cliente: ClienteInterface) {
    this.dataApi.selectedCliente = Object.assign({}, Cliente);
  }
  llenarEncuesta(ClienteId){

  }
  public reiniciar() {
    this.Clientes = [];
  }
}
