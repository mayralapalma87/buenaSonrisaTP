import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit, ElementRef , ViewChild} from '@angular/core';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user';

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
    roles: {}
  };
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private router: Router, private authservice: AuthService, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inpupImageUser: ElementRef;
  public isAdmin: any = null;
  public userId: string = null;
  public isLogged: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authservice.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.userId = auth.uid;
        this.authservice.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          this.user.roles  = userRole.roles;
      });
    } else {
        this.isLogged = false;
      }
    });
  }
  checkedOS(value) {
// tslint:disable-next-line: no-debugger
    if (value === '2') {
      document.getElementById('obraSocialGroupDiv').style.display = 'inherit';
    } else {
      document.getElementById('obraSocialGroupDiv').style.display = 'none';
    }
  }
  tipoUserChanged(value) {
// tslint:disable-next-line: no-debugger
    if (value === '1') {
     document.getElementById('esPaciente').style.display = 'inherit';
    } else {
      document.getElementById('esPaciente').style.display = 'none';
    }
  }
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/pofile_${id}`;
    this.user.foto = filePath;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath , file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  onAddUser() {
    this.authservice.onRegisterUser(this.user)
    .then((res) => {
      this.authservice.isAuth().subscribe( userService => {
        if (userService) {
          userService.updateProfile({
            displayName: this.user.nombre + ' ' + this.user.apellido,
            photoURL: this.inpupImageUser.nativeElement.value
          }).then( () => {
            console.log('User updated.');
          }).catch( (error) => {
            console.log('error', error);
          });
        }
      });
      this.router.navigate(['misTurnos']);
    }).catch();
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
