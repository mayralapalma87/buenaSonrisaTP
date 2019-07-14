import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UserInterface } from '../models/user';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-modalBusqueda',
  templateUrl: './modalBusqueda.component.html',
  styleUrls: ['./modalBusqueda.component.css']
})
export class ModalBusquedaComponent implements OnInit {
  public arrayDeUsuariosOriginalParaFiltrar: UserInterface[] = [];
  public usuariosModal: UserInterface[] = [];
  constructor(private dataApi: DataApiService) { }
  @Input() usuarios: any;
  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit() {
    // console.log("UsuariosRecibidosBusqueda:", this.usuarios );
    this.mostrarDatos(this.usuarios);
  }

  getUsuarios() {
    this.dataApi.getUsers().subscribe( usuarios => {
      this.arrayDeUsuariosOriginalParaFiltrar = usuarios;
    });
  }
  //Metodos de busqueda:
  mostrarDatos(Usuarios) {
    console.log('UsuariosRecibidosBusqueda:', Usuarios);
    this.usuariosModal = Usuarios;
  }
  public reiniciar() {
    this.usuariosModal = [];
  }
  seBorro(id: any) {
    this.usuariosModal = this.arrayDeUsuariosOriginalParaFiltrar.filter( usuario => usuario.id !== id);
  }
  cerrar() {
    this.usuarios = null;
    this.btnClose.nativeElement.click();
  }
}
