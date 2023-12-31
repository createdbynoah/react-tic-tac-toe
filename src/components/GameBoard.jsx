import { useState } from 'react';

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ activePlayerSymbol, onSelectSquare }) {
  const [gameBoard, setGameBoard] = useState(intialGameBoard);

  function handleCellClick(rowIndex, cellIndex) {
    setGameBoard((gameBoard) => {
      const updatedGameBoard = [...gameBoard.map((row) => [...row])];
      updatedGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
      return updatedGameBoard;
    });
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol className="row">
              {row.map((cell, cellIndex) => {
                return (
                  <li key={`${rowIndex}-${cellIndex}`}>
                    <button
                      onClick={() => handleCellClick(rowIndex, cellIndex)}
                    >
                      {cell}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
