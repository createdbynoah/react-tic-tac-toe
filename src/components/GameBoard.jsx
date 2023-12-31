const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  return (
    <ol id="game-board">
      {intialGameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol className="row">
              {row.map((cell, cellIndex) => {
                return (
                  <li key={`${rowIndex}-${cellIndex}`}>
                    <button>{cell}</button>
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
