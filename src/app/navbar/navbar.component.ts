import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../app/services/auth.service';
import { UserInterface } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private afsauth: AngularFireAuth) { }
// tslint:disable-next-line: variable-name
  public app_name = 'BuenaSonrisa';
// tslint:disable-next-line: no-inferrable-types
  public isLogged: boolean = false;
  public isAdmin: any = null;
  public userId: string = null;
  user: UserInterface = {
    id: '',
    nombre: '',
    email: '',
    foto: '',
    roles: {}
  };
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.userId = auth.uid;
        this.user.nombre = auth.displayName;
        this.user.email = auth.email;
        this.user.foto = auth.photoURL;
        this.auth.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          this.user.roles  = userRole.roles;
      });
    } else {
        this.isLogged = false;
      }
    });
  }

  onLogout() {
// tslint:disable-next-line: comment-format
    this.auth.onLogout();
  }


}
