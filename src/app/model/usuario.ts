export class Usuario {
  id: string;
  apellido: string;
  nombre: string;
  password: string;
  email: string;
  username: string;
  tipo_usuario: string;

  constructor(
    id?: string,
    apellido?: string,
    nombre?: string,
    password?: string,
    email?: string,
    username?: string,
    tipo_usuario?: string
  ) {
    this.id = id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.password = password;
    this.email = email;
    this.username = username;
    this.tipo_usuario = tipo_usuario;
  }
}
