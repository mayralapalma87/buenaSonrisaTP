import { Especialidad } from './especialidad';
import { Especialistas } from './especialistas';
// tslint:disable-next-line: class-name
export interface turnoInteface {
  id?: any;
  cliente?: any;
  user?: any;
  especialidad?: any;
  especialista?: any;
  encuesta?: any;
  estado?: string;
  fecha_hora?: any;
  dia_turno?: any;
  hora_turno?: any;
  resena_especialista?: string;
}
