import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  modoJuego: string = ''; // 'jugadorVsJugador' o 'jugadorVsComputadora'
  nombreJugadorUno: string = '';
  nombreJugadorDos: string = '';
  numPartidas: number = 0;
  step: number = 0; // Indica el formulario actual
  showErrors: boolean = false;
  showForm: boolean = false; // Nueva propiedad para gestionar animaciones de formulario


  constructor(private router: Router, private juegoService: JuegoService) {}

  seleccionarModoJuego(modo: string) {
    this.modoJuego = modo;
    this.step = 1; // Iniciar en el primer paso
    this.nombreJugadorUno = '';
    this.nombreJugadorDos = '';
    this.numPartidas = 0;
    this.showErrors = false;
  }

  nextStep() {
    if (this.step === 1 && !this.nombreJugadorUno.trim()) {
      this.showErrors = true;
      return;
    }
    if (this.step === 2 && this.modoJuego === 'jugadorVsJugador' && !this.nombreJugadorDos.trim()) {
      this.showErrors = true;
      return;
    }
    this.showErrors = false;
    this.step++;
  }

  startMatch() {
    if (this.numPartidas <= 0) {
      alert('Por favor ingrese un número de partidas válido.');
      return;
    }

    const esJugadorUnico = this.modoJuego === 'jugadorVsComputadora';
    const nombreJugadorUno = this.nombreJugadorUno.trim();
    const nombreJugadorDos = esJugadorUnico ? 'KAOS' : this.nombreJugadorDos.trim();

    this.juegoService.crearJuego(esJugadorUnico, nombreJugadorUno, nombreJugadorDos, this.numPartidas).subscribe({
      next: (nuevoJuego) => {
        this.router.navigate(['/juego'], {
          queryParams: {
            id: nuevoJuego.id,
            nombreJugadorUno: this.nombreJugadorUno,
            nombreJugadorDos: esJugadorUnico ? 'KAOS' : this.nombreJugadorDos,
            numPartidas: this.numPartidas
            
          }
        });
      },
      error: (error) => {
        console.error('Error al crear el juego:', error);
        alert('Hubo un error al crear el juego. Inténtelo de nuevo.');
      },
      complete: () => console.log('Juego creado con éxito.')
    });
  }
}
