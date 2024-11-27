import { TableroPosicion } from './tableroposicion';  // Asegúrate de usar el nombre correcto
import { Jugador } from './jugador';
import { Juego } from './juego';

export class Partida {
  id: number = 0;
  estado: string = 'Jugando';  // Estado por defecto
  juego: Juego | null = null;  // Relación con Juego
  puntajeJugadorUno: number = 0;  // Puntaje jugador 1
  puntajeJugadorDos: number = 0;  // Puntaje jugador 2
  ganador: Jugador | null = null;  // El ganador de la partida, si lo hay
  turnoActual: string = '';  // Turno del jugador actual
  tablero: TableroPosicion[] = [];  // Tablero con las posiciones

  constructor(init?: Partial<Partida>) {
    Object.assign(this, init);  // Asignar valores iniciales
  }
}
