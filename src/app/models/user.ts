export interface Roles{
  editor?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: string;
  email?: string;
  clave?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  foto?: any;
  roles: Roles;
}
