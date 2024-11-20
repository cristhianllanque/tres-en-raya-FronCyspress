import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {
  @Input() jugador: { nombre: string; puntaje: number } = { nombre: '', puntaje: 0 };
}
