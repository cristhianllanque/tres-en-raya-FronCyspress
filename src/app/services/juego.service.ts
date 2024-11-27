import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Juego {
  id?: string;
  esJugadorUnico: boolean;
  nombreJugadorUno: string;
  nombreJugadorDos?: string;
  numPartidas: number;
  fechaCreacion?: string;
  estado?: string;
  turnoActual?: string;
  puntajeJugadorUno?: number;
  puntajeJugadorDos?: number;
  ganador?: string | null;
  partidas?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private apiUrl = 'http://localhost:8080/api/juegos';

  constructor(private http: HttpClient) {}

  crearJuego(
    esJugadorUnico: boolean,
    nombreJugadorUno: string,
    nombreJugadorDos: string | null,
    numPartidas: number
  ): Observable<Juego> {
    let params = new HttpParams()
      .set('esJugadorUnico', esJugadorUnico.toString())
      .set('nombreJugadorUno', nombreJugadorUno)
      .set('numeroPartidas', numPartidas.toString());

    if (!esJugadorUnico && nombreJugadorDos) {
      params = params.set('nombreJugadorDos', nombreJugadorDos);
    }

    return this.http.post<Juego>(`${this.apiUrl}/iniciar`, null, { params });
  }

  obtenerJuego(juegoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${juegoId}`);
  }

  hacerMovimiento(juegoId: number, posicion: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/hacerMovimiento/${juegoId}`, { posicion });
  }

  reiniciarJuego(juegoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reiniciarJuego/${juegoId}`, {});
  }

  anularJuego(juegoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${juegoId}/anular`, null).pipe(
      catchError(this.handleError)
    );
  }

  actualizarEstadoJuego(juegoId: number, estado: string, ganador: string, puntaje: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/actualizarEstado/${juegoId}`, { estado, ganador, puntaje });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    if (error.status === 0) {
      errorMessage = 'No se puede conectar al servidor';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor';
    }
    console.error('Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
