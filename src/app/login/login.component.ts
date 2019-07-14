import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../app/services/auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  pass = '';
  error = '';
  haveError = false;
// tslint:disable-next-line: variable-name
  constructor(private router: Router, private authservice: AuthService, private _ngZone: NgZone) {
    // public usuario : new User{private email: string , private clave: string};
  }
  onLogin() {
    this.authservice.onLoginEmailUser(this.email, this.pass)
    .then((res) => {
      this.redirectToPerfil();
    }).catch((error) => {
      //error
      this.haveError = true;
      this.error = error;
      console.log(error);
    });
  }
  onLoginFacebook(): void {
    this.authservice.onLoginFacebook()
    .then((res) => {
      this.redirectToPerfil();
    }).catch();
  }
  onLoginGoogle(): void {
    this.authservice.onLoginGoogle()
    .then((res) => {
      this.redirectToPerfil();
    }).catch();
  }
  onLogout(): void {
    this.authservice.onLogout()
    .then((res) => {
      this._ngZone.run(() => {
        this.router.navigate(['login']);
      });
    }).catch();
  }
  redirectToPerfil(): void {
    this._ngZone.run(() => {
      this.router.navigate(['miPerfil']);
    });
  }
  ngOnInit() {
  }
}

