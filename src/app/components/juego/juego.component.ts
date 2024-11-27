import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  player1Name = 'Kamote'; // Nombre del jugador 1
  player2Name = 'Kaos'; // Nombre del jugador 2 (o máquina)
  player1Score = 0;
  player2Score = 0;
  totalRounds = 3;
  currentRound = 1;
  board: string[][] = [['', '', ''], ['', '', ''], ['', '', '']]; // Tablero del juego
  currentPlayer = 'O'; // El jugador 1 (tú) siempre empieza con "O"
  isGameOver = false;
  winner: string | null = null;
  winningLine: number[][] | null = null;
  gameId: string | null = null;
  isComputerOpponent = false; // Indica si el oponente es una máquina

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.gameId = params['id'] || null;
      this.player1Name = params['nombreJugadorUno'] || 'Kamote';
      this.player2Name = params['nombreJugadorDos'] || 'Kaos';
      this.totalRounds = parseInt(params['numPartidas'], 10) || 3;
      this.isComputerOpponent = this.player2Name.toLowerCase() === 'kaos'; // Verificar si el oponente es la máquina
    });
  }

  makeMove(row: number, col: number): void {
    if (this.board[row][col] === '' && !this.isGameOver) {
      // Hacer el movimiento para el jugador actual
      this.board[row][col] = this.currentPlayer;

      // Verificar si hay un ganador
      const winnerInfo = this.checkWinner();
      if (winnerInfo) {
        this.isGameOver = true;
        this.winner = this.currentPlayer === 'X' ? this.player2Name : this.player1Name;
        this.winningLine = winnerInfo;

        // Actualizar puntajes
        if (this.currentPlayer === 'X') this.player2Score++;
        else this.player1Score++;
      } else if (this.isBoardFull()) {
        this.isGameOver = true; // Empate
      } else {
        // Cambiar de turno
        this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';

        // Si es el turno de la máquina, realizar su movimiento automáticamente
        if (this.isComputerOpponent && this.currentPlayer === 'X') {
          setTimeout(() => this.makeComputerMove(), 500); // Retraso para simular el "pensamiento"
        }
      }
    }
  }

  makeComputerMove(): void {
    // Usar el algoritmo Minimax para obtener el mejor movimiento para la máquina
    const bestMove = this.minimax(this.board, 'X');
    if (bestMove) {
      this.board[bestMove.row][bestMove.col] = 'X'; // La máquina siempre juega con X
      // Verificar si la máquina gana tras su jugada
      const winnerInfo = this.checkWinner();
      if (winnerInfo) {
        this.isGameOver = true;
        this.winner = this.player2Name;
        this.winningLine = winnerInfo;
        this.player2Score++;
      } else if (this.isBoardFull()) {
        this.isGameOver = true; // Empate
      } else {
        // Cambiar el turno de vuelta al jugador 1
        this.currentPlayer = 'O';
      }
    }
  }

  minimax(board: string[][], player: string): { row: number, col: number } | null {
    const availableMoves = this.getAvailableMoves(board);
    let bestMove = null;
    let bestValue = player === 'X' ? -Infinity : Infinity;

    // Iterar a través de todas las jugadas posibles
    for (let i = 0; i < availableMoves.length; i++) {
      const { row, col } = availableMoves[i];
      board[row][col] = player;

      const boardValue = this.minimaxScore(board, player);

      if (
        (player === 'X' && boardValue > bestValue) || 
        (player === 'O' && boardValue < bestValue)
      ) {
        bestValue = boardValue;
        bestMove = { row, col };
      }

      board[row][col] = ''; // Deshacer el movimiento
    }
    return bestMove;
  }

  minimaxScore(board: string[][], player: string): number {
    const winnerInfo = this.checkWinner();
    if (winnerInfo) {
      return player === 'X' ? 1 : -1; // Si la máquina gana, +1, si el jugador gana, -1
    } else if (this.isBoardFull()) {
      return 0; // Empate
    }

    return 0; // Si no hay ganador, devolver 0
  }

  getAvailableMoves(board: string[][]): { row: number, col: number }[] {
    const availableMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          availableMoves.push({ row: i, col: j });
        }
      }
    }
    return availableMoves;
  }

  checkWinner(): number[][] | null {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[b[0]][b[1]] === this.board[c[0]][c[1]] &&
        this.board[a[0]][a[1]] !== ''
      ) {
        return combination;
      }
    }
    return null;
  }

  isBoardFull(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  isWinnerCell(row: number, col: number): boolean {
    return this.winningLine?.some(([r, c]) => r === row && c === col) ?? false;
  }

  restartGame(): void {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']]; // Reiniciar el tablero
    this.isGameOver = false;
    this.winner = null;
    this.winningLine = null;

    if (this.currentRound < this.totalRounds) {
      this.currentRound++;
    }

    // Reiniciar el turno inicial al jugador 1
    this.currentPlayer = 'O';
  }

  volverAlMenuPrincipal(): void {
    this.router.navigate(['/']); // Navegar al menú principal
  }
}
