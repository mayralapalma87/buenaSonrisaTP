import { TestBed } from '@angular/core/testing';
import { UserInterface, Roles } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { resolve } from 'url';
import { reject } from 'q';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataApiService } from './data-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private dataApi: DataApiService, private afsauth: AngularFireAuth, private afs: AngularFirestore) { }
  role: Roles = {
    cliente: true,
    especialista: false,
    admin: false
  };
  public userId: any;

  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afsauth.authState.pipe(map(auth => auth));
  }
  onLoginFacebook() {
    return this.afsauth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then(credential => this.updateUserData(credential.user , null, this.role));
  }
  onLoginGoogle() {
    return this.afsauth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(credential => this.updateUserData(credential.user, null, this.role));
  }
  onLoginEmailUser(email: string, pass: string) {
    // tslint:disable-next-line: no-unused-expression
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.afsauth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
  onRegisterUser(user: UserInterface, rol: Roles) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.afsauth.auth.createUserWithEmailAndPassword(user.email, user.clave)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, user, rol);
        }).catch(err => console.log(reject(
            console.log('error', err)
          )));
    });
}
 private updateUserData(userregistry, userData, role) {
  this.dataApi.getUsers().subscribe( usuarios => {
    for (let us of usuarios) {
      if (us.email === userregistry.email) {
        this.userId = us.id;
        }
      }
    if (this.userId == null) {
      this.userId = userregistry.uid;
    }
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userId}`);
    const data: UserInterface = {
      id: this.userId,
      userId: userregistry.uid,
      email: userregistry.email,
      roles: role,
      nombre: userData !== undefined && userData !== null && userData.nombre !== undefined ? userData.nombre : userregistry.displayName,
      telefono: userData !== undefined && userData !== null && userData.telefono !== undefined ? userData.telefono : userregistry.phoneNumber,
      apellido: userData !== undefined && userData !== null && userData.apellido !== undefined ? userData.apellido : '',
      cobertura: userData !== undefined && userData !== null && userData.cobertura !== undefined ? userData.cobertura  : '',
      obraSocial: userData !== undefined && userData !== null && userData.obraSocial !== undefined ? userData.obraSocial : '',
      nroCarnet: userData !== undefined && userData !== null && userData.nroCarnet !== undefined ? userData.nroCarnet : '',
    };
    return userRef.set(data, { merge: true });
  });
  }
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  onLogout() {
    return this.afsauth.auth.signOut();
  }
}
