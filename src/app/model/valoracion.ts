export class Valoracion {
    id: string;
    limpieza: number;
    simpatia: number;
    calidad_precio: number;
    sabor: number;
    diseno: number;

    constructor(
        id?: string,
        limpieza?: number,
        simpatia?: number,
        calidad_precio?: number,
        sabor?: number,
        diseno?: number
        ) {
        this.id = id;
        this.limpieza = limpieza;
        this.simpatia = simpatia;
        this.sabor = sabor;
        this.calidad_precio = calidad_precio;
        this.diseno = diseno;
    }
}
