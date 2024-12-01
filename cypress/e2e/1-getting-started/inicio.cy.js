describe('Prueba de la página de inicio del juego Tic-Tac-Toe', () => {
  
    beforeEach(() => {
      // Visita la página de inicio del juego
      cy.visit('http://localhost:4200');
    });
  
    it('Debe cargar la página de inicio correctamente', () => {
      // Verifica que el título del juego esté visible
      cy.get('.game-title').should('contain.text', 'Tic Tac Toe');
    });
  
    it('Debe mostrar los botones de selección de modo de juego', () => {
      // Verifica que los botones de selección de modo de juego estén presentes
      cy.get('button').contains('Jugar Persona').should('be.visible');
      cy.get('button').contains('Jugar Computadora').should('be.visible');
    });
  
    it('Debe permitir seleccionar "Jugar Persona" como modo de juego', () => {
      // Simula un clic en el botón "Jugar Persona"
      cy.get('button').contains('Jugar Persona').click();
      // Verifica que el modo de juego se ha seleccionado correctamente
      cy.get('button').contains('Jugar Persona').should('have.class', 'btn-selected');
    });
  
    it('Debe permitir seleccionar "Jugar Computadora" como modo de juego', () => {
      // Simula un clic en el botón "Jugar Computadora"
      cy.get('button').contains('Jugar Computadora').click();
      // Verifica que el modo de juego se ha seleccionado correctamente
      cy.get('button').contains('Jugar Computadora').should('have.class', 'btn-selected');
    });
  
    it('Debe mostrar el formulario para el Jugador 1 después de seleccionar un modo de juego', () => {
      // Selecciona el modo de juego "Jugar Persona"
      cy.get('button').contains('Jugar Persona').click();
      // Verifica que el formulario de Jugador 1 esté visible
      cy.get('input#jugador1').should('be.visible');
    });
  
    it('Debe permitir ingresar un nombre para el Jugador 1', () => {
      // Selecciona el modo de juego "Jugar Persona"
      cy.get('button').contains('Jugar Persona').click();
      // Ingresa un nombre para el Jugador 1
      cy.get('input#jugador1').type('Jugador 1');
      // Verifica que el nombre se haya ingresado correctamente
      cy.get('input#jugador1').should('have.value', 'Jugador 1');
    });
  
    it('Debe pasar al siguiente paso después de ingresar el nombre del Jugador 1', () => {
      // Selecciona el modo de juego "Jugar Persona"
      cy.get('button').contains('Jugar Persona').click();
      // Ingresa el nombre del Jugador 1
      cy.get('input#jugador1').type('Jugador 1');
      // Simula el clic en el botón "Siguiente"
      cy.get('button').contains('Siguiente').click();
      // Verifica que el formulario para el Jugador 2 esté visible
      cy.get('input#jugador2').should('be.visible');
    });
  
    it('Debe permitir ingresar el nombre del Jugador 2 (solo si es jugadorVsJugador)', () => {
      // Selecciona el modo de juego "Jugar Persona"
      cy.get('button').contains('Jugar Persona').click();
      // Ingresa el nombre del Jugador 1
      cy.get('input#jugador1').type('Jugador 1');
      // Avanza al siguiente paso
      cy.get('button').contains('Siguiente').click();
      // Ingresa el nombre del Jugador 2
      cy.get('input#jugador2').type('Jugador 2');
      // Verifica que el nombre se haya ingresado correctamente
      cy.get('input#jugador2').should('have.value', 'Jugador 2');
    });
  
    it('Debe mostrar el formulario para el número de partidas (si es jugadorVsComputadora)', () => {
      // Selecciona el modo de juego "Jugar Computadora"
      cy.get('button').contains('Jugar Computadora').click();
      // Verifica que el formulario de número de partidas esté visible
      cy.get('input#numPartidas').should('be.visible');
    });
  
    it('Debe permitir ingresar el número de partidas', () => {
      // Selecciona el modo de juego "Jugar Computadora"
      cy.get('button').contains('Jugar Computadora').click();
      // Ingresa el número de partidas
      cy.get('input#numPartidas').type('3');
      // Verifica que el número de partidas se haya ingresado correctamente
      cy.get('input#numPartidas').should('have.value', '3');
    });
  
    it('Debe permitir iniciar el juego después de ingresar el número de partidas', () => {
      // Selecciona el modo de juego "Jugar Computadora"
      cy.get('button').contains('Jugar Computadora').click();
      // Ingresa el número de partidas
      cy.get('input#numPartidas').type('3');
      // Simula el clic en el botón "Iniciar Juego"
      cy.get('button').contains('Iniciar Juego').click();
      // Aquí podrías verificar si el juego ha comenzado, dependiendo de cómo se maneje el flujo
      // Verifica, por ejemplo, que el tablero de juego esté visible
      cy.get('.game-board').should('be.visible');
    });
  });
  
  