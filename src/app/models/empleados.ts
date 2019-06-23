import { User } from 'src/app/models//user';
import { turnoInteface } from './turnoInterface';


export class Empleados implements User {
  id?: any;
  public rol: string;
  public idEmpleado: Int32Array;
  public turnos: Array<turnoInteface>;
}
