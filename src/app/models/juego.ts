import { Jugador } from './jugador';
import { Partida } from './partida';

export class Juego {
  id: number = 0;
  estado: string = 'Jugando';
  puntajeJugadorUno: number = 0;
  puntajeJugadorDos: number = 0;
  turnoActual: string = '';
  ganador: Jugador | null = null;
  esJugadorUnico: boolean = false;
  fechaCreacion: string = '';  // Asegúrate de recibirla como string en formato ISO 8601
  numeroPartidas: number | null = null; // Puede ser null si no siempre está presente
  partidas: Partida[] = []; // Lista vacía inicializada

  jugadorUno: Jugador | null = null;
  jugadorDos: Jugador | null = null;

  nombre: string = ''; // Nombre del jugador
  puntaje: number = 0; // Puntaje del jugador

  constructor(init?: Partial<Juego>) {
    Object.assign(this, init);
  }
}
