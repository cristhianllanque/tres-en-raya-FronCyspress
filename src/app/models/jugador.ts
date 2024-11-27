  export class Jugador {
    id: number = 0;  // Se asume que 'id' es un número
    nombre: string = '';  // 'nombre' siempre debe ser una cadena no vacía, según las reglas del backend

    constructor(init?: Partial<Jugador>) {
      Object.assign(this, init);
    }
  }
