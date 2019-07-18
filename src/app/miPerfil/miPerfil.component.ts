import { DataApiService } from './../services/data-api.service';
import { UserInterface, Roles } from './../models/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-miPerfil',
  templateUrl: './miPerfil.component.html',
  styleUrls: ['./miPerfil.component.css']
})
export class MiPerfilComponent implements OnInit {

// tslint:disable-next-line: max-line-length
constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage, private dataApi: DataApiService) { }
@ViewChild('imageUser') inpupImageUser: ElementRef;
user: UserInterface = {
  nombre: '',
  email: '',
  foto: '',
  id: '',
  apellido: '',
  telefono: '',
  cobertura: '',
  obraSocial: '',
  nroCarnet: '',
  roles: {
    cliente: false,
    especialista: false,
    admin: false
  }
};
public isAdmin: any = null;
public userId: string = null;
public isLogged = false;
public selectedRole: any;
error = '';
haveError = false;
info = false;
uploadPercent: Observable<number>;
urlImage: Observable<string>;

 // tslint:disable-next-line: no-inferrable-types
 public providerId: string = 'null';
  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    if (this.dataApi.currentUser.id == null) {
    this.authService.isAuth().subscribe(us => {
      if (us) {
        this.user.email = us.email;
        if (us.photoURL !== null) {
        this.user.foto = us.photoURL;
        }
        if (us.providerData[0].providerId !== null) {
        this.providerId = us.providerData[0].providerId;
        }
        this.isLogged = true;
        this.userId = us.uid;
        this.user.id = this.userId;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          if (userRole !== undefined) {
          this.isAdmin = userRole.roles.admin;
          this.user.roles  = userRole.roles;
          }
      });
    } else {
        this.isLogged = false;
      }
      this.dataApi.getUserDataUserbyId(this.userId).subscribe(usuario => {
      if (usuario) {
        if (usuario.cobertura !== null) {
        this.user.cobertura = usuario.cobertura;
        }
        if (usuario.nroCarnet !== null) {
        this.user.nroCarnet = usuario.nroCarnet;
        }
        if (usuario.nombre !== null) {
        this.user.nombre = usuario.nombre;
        }
        if (usuario.apellido !== null) {
        this.user.apellido = usuario.apellido;
        }
        if (usuario.foto !== null) {
          this.user.foto = usuario.foto;
        }
        if (usuario.telefono !== null) {
          this.user.telefono = usuario.telefono;
          }
      } else {
        let usuario;
        this.dataApi.getUsers().subscribe( usuarios => {
          for (let us of usuarios) {
            if (us.userId === this.userId) {
               usuario = us;
              }
            }
          if (usuario) {
            this.user.id = usuario.id;
            this.user.roles  = usuario.roles;
            this.isAdmin = usuario.roles.admin;
            if (usuario.cobertura !== null) {
            this.user.cobertura = usuario.cobertura;
            }
            if (usuario.nroCarnet !== null) {
            this.user.nroCarnet = usuario.nroCarnet;
            }
            if (usuario.nombre !== null) {
            this.user.nombre = usuario.nombre;
            }
            if (usuario.apellido !== null) {
            this.user.apellido = usuario.apellido;
            }
            if (usuario.foto !== null) {
              this.user.foto = usuario.foto;
            }
            if (usuario.telefono !== null) {
              this.user.telefono = usuario.telefono;
              }
            }
        });
      }
    });
  });
    this.dataApi.currentUser = this.user;
  }
 }
  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/pofile_${id}`;
    this.user.foto = filePath;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath , file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  modificarUser(usuario: UserInterface) {
    this.dataApi.selectedUser = Object.assign({}, usuario);
    this.dataApi.modificarUsuario(usuario);
  }
  onUpdateUser() {
   if (this.user.nroCarnet === undefined) { this.user.nroCarnet = ''; }
   this.modificarUser(this.user);
   this.authService.isAuth().subscribe( userService => {
        if (userService) {
          if (this.inpupImageUser.nativeElement.value !== null) {
            userService.updateProfile({
            displayName: this.user.nombre + ' ' + this.user.apellido,
            photoURL: this.inpupImageUser.nativeElement.value,
            phoneNumber: this.user.telefono
          }).then( () => {
            console.log('User updated.');
            this.info = true;
          }).catch( (error) => {
             // error
            this.haveError = true;
            this.error = error;
            console.log('error', error);
          });
        } else {
          userService.updateProfile({
            displayName: this.user.nombre + ' ' + this.user.apellido,
            phoneNumber: this.user.telefono
          }).then( () => {
            console.log('User updated.');
          }).catch( (error) => {
             // error
            this.haveError = true;
            this.error = error;
            console.log('error', error);
          });
        }
      }
      });
  }

}
