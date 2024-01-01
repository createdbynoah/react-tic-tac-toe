export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol className="row">
              {row.map((cell, cellIndex) => {
                return (
                  <li key={`${rowIndex}-${cellIndex}`}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, cellIndex)}
                      disabled={cell !== null}
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
