export interface Roles {
  cliente?: boolean;
  especialista?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: string;
  userId?: string;
  email?: string;
  nombre?: string;
  clave?: string;
  apellido?: string;
  telefono?: string;
  cobertura?: string;
  obraSocial?: any;
  nroCarnet?: any;
  foto?: any;
  roles?: Roles;
  especialidad?: any;
  creacionAdmin?: boolean;
}
