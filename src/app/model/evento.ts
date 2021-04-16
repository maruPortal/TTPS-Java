import { Usuario } from './usuario';

export class Evento {
  id: String;
  nombre: String;
  direccion: String;
  codigo_postal;
  provincia: String;
  geolocalizacion: String;
  fecha_hora: String;
  email: String;
  tel_contacto: Number;
  descripcion: String;
  tipo_evento: String;
  forma_pago: String;
  organizador: Usuario;

  constructor(
    organizador?: Usuario,
    id?: String,
    nombre?: String,
    direccion?: String,
    codigo_postal?,
    provincia?: String,
    geolocalizacion?: String,
    fecha_hora?: String,
    email?: String,
    tel_contacto?: Number,
    descripcion?: String,
    tipo_evento?: String,
    forma_pago?: String
  ) {
    this.organizador = organizador;
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.direccion = direccion;
    this.codigo_postal = codigo_postal;
    this.provincia = provincia;
    this.geolocalizacion = geolocalizacion;
    this.fecha_hora = fecha_hora;
    this.tel_contacto = tel_contacto;
    this.descripcion = descripcion;
    this.tipo_evento = tipo_evento;
    this.forma_pago = forma_pago;
  }
}
