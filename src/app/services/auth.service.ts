import { TestBed } from '@angular/core/testing';
import { UserInterface, Roles } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { resolve } from 'url';
import { reject } from 'q';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afsauth: AngularFireAuth, private afs: AngularFirestore) { }
  role: Roles = {
    cliente: true,
    especialista: false,
    admin: false
  };

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
        }).catch(err => console.log(reject(err)));
    });
  }
 private updateUserData(userregistry, userData, role) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userregistry.uid}`);
    const data: UserInterface = {
      id: userregistry.uid,
      email: userregistry.email,
      roles: role,
      nombre: userData != null ? userData.nombre : userregistry.displayName,
      telefono: userData != null ? userData.telefono : userregistry.phoneNumber,
      apellido: userData != null ? userData.apellido : '',
      cobertura: userData != null ? userData.cobertura : '',
      obraSocial: userData != null ? userData.obraSocial : '',
      nroCarnet: userData != null ? userData.nroCarnet : '',
    };
    return userRef.set(data, { merge: true })
  }
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  onLogout() {
    return this.afsauth.auth.signOut();
  }
}
