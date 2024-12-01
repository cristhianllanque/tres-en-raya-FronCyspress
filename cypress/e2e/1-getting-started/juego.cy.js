describe('Prueba del tablero de juego Tic-Tac-Toe', () => {
  
    beforeEach(() => {
      // Visita la página del juego
      cy.visit('http://localhost:4200/juego');
    });
  
    it('Debe cargar el tablero de juego correctamente', () => {
      // Verifica que el tablero de juego esté visible
      cy.get('.game-board').should('be.visible');
    });
  
    it('Debe mostrar la información de los jugadores correctamente', () => {
      // Verifica que el nombre de los jugadores, signos y puntajes estén visibles
      cy.get('.jugador-info').eq(0).should('contain.text', 'Jugador 1'); // Jugador 1
      cy.get('.jugador-info').eq(0).should('contain.text', 'O'); // Signo Jugador 1
      cy.get('.jugador-info').eq(0).should('contain.text', 'Puntaje: 0'); // Puntaje Jugador 1
  
      cy.get('.jugador-info').eq(1).should('contain.text', 'Jugador 2'); // Jugador 2
      cy.get('.jugador-info').eq(1).should('contain.text', 'X'); // Signo Jugador 2
      cy.get('.jugador-info').eq(1).should('contain.text', 'Puntaje: 0'); // Puntaje Jugador 2
    });
  
    it('Debe mostrar el marcador de partidas correctamente', () => {
      // Verifica que el número de la partida actual y total esté visible
      cy.get('.puntaje-info').should('contain.text', 'Partida: 1 / 3');
    });
  
    it('Debe permitir hacer un movimiento en el tablero', () => {
      // Verifica que se pueda hacer un movimiento en una celda del tablero
      cy.get('.game-board .cell').first().click();
      cy.get('.game-board .cell').first().should('contain.text', 'O');
    });
  
    it('Debe marcar la celda como ganadora cuando un jugador gane', () => {
      // Simula los movimientos para un ganador en la fila superior
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que la celda ganadora esté marcada
      cy.get('.game-board .cell').eq(0).should('have.class', 'winner-cell');
      cy.get('.game-board .cell').eq(3).should('have.class', 'winner-cell');
      cy.get('.game-board .cell').eq(6).should('have.class', 'winner-cell');
    });
  
    it('Debe mostrar el resultado final cuando el juego termine', () => {
      // Simula una victoria
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el mensaje de ganador esté visible
      cy.get('.resultado-final h2').should('contain.text', '¡Eres el ganador final, Jugador 1!');
    });
  
    it('Debe permitir reiniciar el juego', () => {
      // Simula una victoria
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el botón "¡Jugar de nuevo!" esté visible
      cy.get('.resultado-final button').contains('¡Jugar de nuevo!').should('be.visible');
      // Simula el clic en el botón "¡Jugar de nuevo!"
      cy.get('.resultado-final button').contains('¡Jugar de nuevo!').click();
      // Verifica que el tablero esté vacío después de reiniciar
      cy.get('.game-board .cell').each((cell) => {
        cy.wrap(cell).should('not.contain.text');
      });
    });
  
    it('Debe permitir regresar al menú principal', () => {
      // Simula una victoria
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el botón "Regresar al Menú Principal" esté visible
      cy.get('.resultado-final button').contains('Regresar al Menú Principal').should('be.visible');
      // Simula el clic en el botón "Regresar al Menú Principal"
      cy.get('.resultado-final button').contains('Regresar al Menú Principal').click();
      // Verifica que hayas vuelto al menú principal
      cy.url().should('include', '/menu-principal');
    });
  });
  