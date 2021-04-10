import { Evento } from "./evento";
import { Foodtruck } from "./foodtruck";
import { Usuario } from "./usuario";
import { Valoracion } from "./valoracion";

export class Solicitud {
    id: string;
    estado: string;
    creador: Usuario;
    solicitado: Usuario;
    foodtruck: Foodtruck;
    evento: Evento;
    valoracion: Valoracion;
  
    constructor(
        id?: string,
        estado?: string,
        creador?: Usuario,
        solicitado?: Usuario,
        foodtruck?: Foodtruck,
        evento?: Evento,
        valoracion?: Valoracion
    ) {
      this.id = id;
      this.estado = estado;
      this.creador = creador;
      this.solicitado = solicitado;
      this.foodtruck = foodtruck;
      this.evento = evento;
      this.valoracion = valoracion;
    }
}
