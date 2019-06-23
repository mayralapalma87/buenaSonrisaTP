import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../app/services/auth.service';

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

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('user is NOT logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
// tslint:disable-next-line: comment-format
    this.auth.onLogout();
  }


}
