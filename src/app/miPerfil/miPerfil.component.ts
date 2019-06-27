import { UserInterface } from './../models/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-miPerfil',
  templateUrl: './miPerfil.component.html',
  styleUrls: ['./miPerfil.component.css']
})
export class MiPerfilComponent implements OnInit {

constructor(private authService: AuthService) { }
user: UserInterface = {
  nombre: '',
  email: '',
  foto: '',
  roles: {}
};
 public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.nombre = user.displayName;
        this.user.email = user.email;
        this.user.foto = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    }
    );
  }
}
