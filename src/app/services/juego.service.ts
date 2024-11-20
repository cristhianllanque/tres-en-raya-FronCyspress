import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://localhost:8080/api/juegos'; // URL del backend

  constructor(private http: HttpClient) {}

  iniciarJuego(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar`, data);
  }

  obtenerEstadoJuego(juegoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${juegoId}`);
  }

  hacerMovimiento(juegoId: number, posicion: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${juegoId}/movimiento`, { posicion });
  }
}
