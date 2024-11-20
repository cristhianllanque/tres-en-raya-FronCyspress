import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes de las rutas
import { InicioComponent } from './pages/inicio/inicio.component';
import { JuegoComponent } from './components/juego/juego.component';
import { PartidasComponent } from './pages/partidas/partidas.component';

// Define las rutas de tu aplicación
const routes: Routes = [
  { path: 'inicio', component: InicioComponent }, // Ruta para la página de inicio
  { path: 'juego', component: JuegoComponent }, // Ruta para el componente de juego
  { path: 'partidas', component: PartidasComponent }, // Ruta para ver las partidas
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige al inicio por defecto
  { path: '**', redirectTo: '/inicio' }, // Redirige cualquier ruta inválida al inicio
];

// Configura el módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Carga las rutas
  exports: [RouterModule], // Exporta RouterModule para usar en el proyecto
})
export class AppRoutingModule {}
