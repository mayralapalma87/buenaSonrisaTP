import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit, ElementRef , ViewChild} from '@angular/core';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInterface, Roles } from 'src/app/models/user';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})

export class RegistrarseComponent implements OnInit {
  user: UserInterface = {
    nombre: '',
    email: '',
    foto: '',
    roles: {
      cliente: false,
      especialista: false,
      admin: false
    }
  };
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private router: Router, private authservice: AuthService, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inpupImageUser: ElementRef;
  public isAdmin: any = null;
  public userId: string = null;
  public isLogged = false;
  public selectedRole: any;
  rol: Roles = {
    cliente: false,
    especialista: false,
    admin: false
  };
  error = '';
  haveError = false;

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authservice.isAuth().subscribe(us => {
      if (us) {
        this.isLogged = true;
        this.userId = us.uid;
        this.authservice.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = userRole.roles.admin;
          this.user.roles  = userRole.roles;
      });
    } else {
        this.isLogged = false;
      }
    });
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
  setRole(value) {
    if (value === '1') {
     this.rol.cliente = true;
    }
    if (value === '2') {
      this.rol.especialista = true;
    }
    if (value === '3') {
      this.rol.admin = true;
     }
  }
  onAddUser() {
    this.authservice.onRegisterUser(this.user, this.rol)
    .then((res) => {
      this.authservice.isAuth().subscribe( userService => {
        if (userService) {
          userService.updateProfile({
            displayName: this.user.nombre,
            photoURL: this.inpupImageUser.nativeElement.value
          }).then( () => {
            console.log('User updated.');
          }).catch( (error) => {
             // error
            this.haveError = true;
            this.error = error;
            console.log('error', error);
          });
        }
      });
      this.router.navigate(['miPerfil']);
    }).catch((error) => {
      // error
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
  redirectToPerfil(): void {
      this.router.navigate(['miPerfil']);
  }

}
