import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

import { WINNING_COMBINATIONS } from './winning-combinations';

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/**
 * Derives the active player based on the turns array.
 * @param {Array} turns - The array of turns.
 * @returns {string} - The active player ('X' or 'O').
 */
function deriveActivePlayer(turns) {
  const lastTurn = turns[0];
  return lastTurn ? (lastTurn.player === 'X' ? 'O' : 'X') : 'X';
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  /**
   * Represents the game board with the current state of the game.
   * @type {Array<Array<string|null>>}
   */
  const gameBoard = gameTurns.reduce((gameBoard, turn) => {
    const updatedGameBoard = [...gameBoard.map((row) => [...row])];
    updatedGameBoard[turn.position[0]][turn.position[1]] = turn.player;
    return updatedGameBoard;
  }, intialGameBoard);

  let winner;

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];

    if (
      gameBoard[a.row][a.column] &&
      gameBoard[a.row][a.column] === gameBoard[b.row][b.column] &&
      gameBoard[a.row][a.column] === gameBoard[c.row][c.column]
    ) {
      winner = gameBoard[a.row][a.column];
      break;
    }
  }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        {winner && <p>{`Player ${winner} won!`}</p>}
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
