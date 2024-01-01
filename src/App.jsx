import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

import { WINNING_COMBINATIONS } from './winning-combinations';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

/**
 * Derives the active player based on the turns array.
 * @param {Array} turns - The array of turns.
 * @returns {string} - The active player ('X' or 'O').
 */
function deriveActivePlayer(turns) {
  const lastTurn = turns[0];
  return lastTurn ? (lastTurn.player === 'X' ? 'O' : 'X') : 'X';
}

/**
 * Determines the winner of the tic-tac-toe game based on the current game board.
 * @param {Array<Array<string|null>>} gameBoard - The current game board represented as a 2D array.
 * @param {Array<string>} players - An array of player names.
 * @returns {string|null} - The name of the winning player or null if there is no winner.
 */
function deriveWinner(gameBoard, players) {
  let winner;

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];

    if (
      gameBoard[a.row][a.column] &&
      gameBoard[a.row][a.column] === gameBoard[b.row][b.column] &&
      gameBoard[a.row][a.column] === gameBoard[c.row][c.column]
    ) {
      winner = players[gameBoard[a.row][a.column]];
      break;
    }
  }

  return winner;
}

/**
 * Derives the game board based on the given game turns.
 * @param {Array} gameTurns - The array of game turns.
 * @returns {Array} - The derived game board.
 */
function deriveGameboard(gameTurns) {
  const gameBoard = gameTurns.reduce((gameBoard, turn) => {
    const updatedGameBoard = [...gameBoard.map((row) => [...row])];
    updatedGameBoard[turn.position[0]][turn.position[1]] = turn.player;
    return updatedGameBoard;
  }, INITIAL_GAME_BOARD);

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  /**
   * Handles the selection of a square on the game board.
   * @param {number} rowIndex - The index of the row where the square is located.
   * @param {number} cellIndex - The index of the cell within the row where the square is located.
   */
  function handleSelectSquare(rowIndex, cellIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      return [
        {
          player: currentPlayer,
          position: [rowIndex, cellIndex],
        },
        ...gameTurns,
      ];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={INITIAL_PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={INITIAL_PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
