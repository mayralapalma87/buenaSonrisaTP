import { Especialistas } from './../models/especialistas';
import { turnoInteface } from './../models/turnoInterface';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';
import { TurnosService } from './turnos.service';
import * as firebase from 'firebase';
import { Especialidad } from '../models/especialidad';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  // tslint:disable-next-line: max-line-length
  constructor(private afs: AngularFirestore) {
    this.listaTurnos = afs.collection<turnoInteface>('turnos');
    this.turnos = this.listaTurnos.valueChanges();
    this.listaEspecialistas = afs.collection<Especialistas>('especialista');
    this.especialistas = this.listaEspecialistas.valueChanges();
    this.listaEspecialidad = afs.collection<Especialistas>('especialidad');
    this.especialidades = this.listaEspecialistas.valueChanges();
  }

  private listaTurnos: AngularFirestoreCollection<turnoInteface>;
  private turnos: Observable<turnoInteface[]>;
  private turnoDoc: AngularFirestoreDocument<turnoInteface>;
  private turno: Observable<turnoInteface>;
  public selectedTurno: turnoInteface = {
    id: null
  };

  private listaEspecialistas: AngularFirestoreCollection<Especialistas>;
  private especialistas: Observable<Especialistas[]>;
  private especialistaDoc: AngularFirestoreDocument<Especialistas>;
  private especialista: Observable<Especialistas>;

  private listaEspecialidad: AngularFirestoreCollection<Especialidad>;
  private especialidades: Observable<Especialidad[]>;
  private especialidadDoc: AngularFirestoreDocument<Especialidad>;
  private especialidad: Observable<Especialistas>;

  private listaUser: AngularFirestoreCollection<User>;
  private Useres: Observable<User[]>;
  private UserDoc: AngularFirestoreDocument<User>;
  private User: Observable<Especialistas>;


  getTurnos() {
    return this.turnos = this.listaTurnos.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as turnoInteface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getEspecialistas() {
    return this.especialistas = this.listaEspecialistas.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Especialistas;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getEspecialidades() {
    return this.especialidades = this.listaEspecialidad.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Especialidad;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getTurnobyId(idTurno: string) {
    this.turnoDoc = this.afs.doc<turnoInteface>(`turnos/${idTurno}`);
    return this.turno = this.turnoDoc.snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as turnoInteface;
          data.id = action.payload.id;
          return data;
        }
      }));
  }
  getEspecialistabyId(id: string) {
    this.especialistaDoc = this.afs.doc<Especialistas>(`especialista/${id}`);
    return this.turno = this.turnoDoc.snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Especialistas;
          data.id = action.payload.id;
          return data;
        }
      }));
  }
  getEspecialidadbyId(id: string) {
    this.especialidadDoc = this.afs.doc<Especialidad>(`especialidad/${id}`);
    return this.turno = this.turnoDoc.snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Especialidad;
          data.id = action.payload.id;
          return data;
        }
      }));
  }
  getUserDataUserbyId(id: string) {
    this.UserDoc = this.afs.doc<User>(`usuario/${id}`);
    return this.turno = this.turnoDoc.snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as User;
          data.id = action.payload.id;
          return data;
        }
      }));
  }

  agregarTurno(turno: turnoInteface): void {
    this.listaTurnos.add(turno);
  }
  modificarTurno(turno: turnoInteface) {
    let idTurno = turno.id;
    this.turnoDoc = this.afs.doc<turnoInteface>(`turnos/${idTurno}`);
    this.turnoDoc.update(turno);
  }
  borrarTurno(idTurno: string) {
    this.turnoDoc = this.afs.doc<turnoInteface>(`turnos/${idTurno}`);
    this.turnoDoc.delete();
  }

}
