const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({
  activePlayerSymbol,
  onSelectSquare,
  turns,
}) {
  //   const [gameBoard, setGameBoard] = useState(intialGameBoard);

  //   function handleCellClick(rowIndex, cellIndex) {
  //     setGameBoard((gameBoard) => {
  //       const updatedGameBoard = [...gameBoard.map((row) => [...row])];
  //       updatedGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //     });
  //     onSelectSquare();
  //   }

  //   const gameBoard = turns.reduce((gameBoard, turn) => {
  //     const updatedGameBoard = [...gameBoard.map((row) => [...row])];
  //     updatedGameBoard[turn.position[0]][turn.position[1]] = turn.player;
  //     return updatedGameBoard;
  //   }, intialGameBoard);

  let gameBoard = intialGameBoard;

  for (let turn of turns) {
    gameBoard[turn.position[0]][turn.position[1]] = turn.player;
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
                    <button onClick={() => onSelectSquare(rowIndex, cellIndex)}>
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
