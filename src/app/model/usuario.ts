export class Usuario {
  id: string;
  apellido: string;
  nombre: string;
  password: string;
  email: string;
  username: string;
  tipo: string;

  constructor(
    id?: string,
    apellido?: string,
    nombre?: string,
    password?: string,
    email?: string,
    username?: string,
    tipo?: string
  ) {
    this.id = id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.password = password;
    this.email = email;
    this.username = username;
    this.tipo = tipo;
  }
}
