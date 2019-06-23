import { turnoInteface } from './../models/turnoInterface';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';
import { TurnosService } from './turnos.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  // tslint:disable-next-line: max-line-length
  constructor(private afs: AngularFirestore) {
    this.listaTurnos = afs.collection<turnoInteface>('turnos');
    this.turnos = this.listaTurnos.valueChanges();
  }

  private listaTurnos: AngularFirestoreCollection<turnoInteface>;
  private turnos: Observable<turnoInteface[]>;
  private turnoDoc: AngularFirestoreDocument<turnoInteface>;
  private turno: Observable<turnoInteface>;
  public selectedTurno: turnoInteface = {
    id: null
  };
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
