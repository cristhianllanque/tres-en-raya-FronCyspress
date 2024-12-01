describe('Prueba de la sección de resultado del juego', () => {

    beforeEach(() => {
      // Visita la página del juego
      cy.visit('http://localhost:4200/juego');
    });
  
    it('Debe mostrar el mensaje "¡Juego Terminado!" cuando el juego termine', () => {
      // Simula los movimientos para terminar el juego
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el mensaje de "Juego Terminado" esté visible
      cy.get('.container h1').should('contain.text', '¡Juego Terminado!');
    });
  
    it('Debe mostrar el ganador o empate según corresponda', () => {
      // Simula una victoria para el Jugador 1
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el mensaje de ganador se muestre correctamente
      cy.get('.container').should('contain.text', '¡Eres el ganador final, Jugador 1!');
    });
  
    it('Debe mostrar un mensaje de empate cuando sea el caso', () => {
      // Simula un empate
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(2).click(); // Jugador 1
      cy.get('.game-board .cell').eq(3).click(); // Jugador 2
      cy.get('.game-board .cell').eq(4).click(); // Jugador 1
      cy.get('.game-board .cell').eq(5).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
      cy.get('.game-board .cell').eq(7).click(); // Jugador 2
      cy.get('.game-board .cell').eq(8).click(); // Jugador 1
  
      // Verifica que el mensaje de empate se muestre correctamente
      cy.get('.container').should('contain.text', '¡Empate!');
    });
  
    it('Debe tener un botón para jugar nuevamente', () => {
      // Simula un resultado final
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el botón "¡Jugar de nuevo!" esté visible
      cy.get('.container button').contains('¡Jugar de nuevo!').should('be.visible');
    });
  
    it('Debe permitir reiniciar el juego al presionar "¡Jugar de nuevo!"', () => {
      // Simula un resultado final
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el botón "¡Jugar de nuevo!" esté visible
      cy.get('.container button').contains('¡Jugar de nuevo!').click();
  
      // Verifica que el tablero de juego esté vacío después de reiniciar
      cy.get('.game-board .cell').each((cell) => {
        cy.wrap(cell).should('not.contain.text');
      });
    });
  
    it('Debe permitir regresar al menú principal desde el resultado', () => {
      // Simula un resultado final
      cy.get('.game-board .cell').eq(0).click(); // Jugador 1
      cy.get('.game-board .cell').eq(1).click(); // Jugador 2
      cy.get('.game-board .cell').eq(3).click(); // Jugador 1
      cy.get('.game-board .cell').eq(4).click(); // Jugador 2
      cy.get('.game-board .cell').eq(6).click(); // Jugador 1
  
      // Verifica que el botón "Regresar al Menú Principal" esté visible
      cy.get('.container button').contains('Regresar al Menú Principal').should('be.visible');
      // Simula el clic en el botón "Regresar al Menú Principal"
      cy.get('.container button').contains('Regresar al Menú Principal').click();
      // Verifica que hayas vuelto al menú principal
      cy.url().should('include', '/menu-principal');
    });
  });
  