import { Partida } from './partida';

export class TableroPosicion {  
  id: number = 0;
  nombreJugador: string | null = null;  // Puede ser nulo si la posición no está ocupada
  indice: number = 0;  // Índice de la posición en el tablero
  partida: Partida | null = null;  // Relación con la partida

  constructor(init?: Partial<TableroPosicion>) {
    Object.assign(this, init);  // Asignar valores iniciales
  }
}
