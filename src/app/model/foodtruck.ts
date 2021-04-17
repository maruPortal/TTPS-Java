import { Usuario } from './usuario';

export class Foodtruck {
  id: string;
  nombre: string;
  tipo_servicio: string;
  descripcion: string;
  url: string;
  instagram: string;
  whatsapp: string;
  facebook: String;
  puntaje: number;
  dueno: Usuario;
  imagenes: String[];
  eliminado: number;

  constructor(
    id?: string,
    nombre?: string,
    tipo_servicio?: string,
    descripcion?: string,
    url?: string,
    instagram?: string,
    whatsapp?: string,
    facebook?: String,
    puntaje?: number,
    dueno?: Usuario,
    eliminado?: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo_servicio = tipo_servicio;
    this.descripcion = descripcion;
    this.url = url;
    this.instagram = instagram;
    this.whatsapp = whatsapp;
    this.facebook = facebook;
    this.puntaje = puntaje;
    this.dueno = dueno;
    this.eliminado = eliminado;
  }
}
