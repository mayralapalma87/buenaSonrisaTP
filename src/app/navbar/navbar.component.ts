import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../app/services/auth.service';
import { UserInterface } from '../models/user';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private afsauth: AngularFireAuth, private dataApi: DataApiService) { }
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
    this.auth.isAuth().subscribe(us => {
      if (us) {
        this.isLogged = true;
        this.userId = us.uid;
        this.user.nombre = us.displayName;
        this.user.email = us.email;
        this.user.foto = us.photoURL;
        this.auth.isUserAdmin(us.uid).subscribe(userRole => {
          if (userRole !== undefined) {
            this.isAdmin = userRole.roles.admin;
            this.user.roles  = userRole.roles;
          }
          else {
            this.dataApi.getUsers().subscribe( usuarios => {
              for (let us of usuarios) {
                if (us.userId === this.userId) {
                  this.isAdmin = us.roles.admin;
                  this.user  = us;
                  }
                }
            });
          }
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
