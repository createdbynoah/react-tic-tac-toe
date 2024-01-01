import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, cellIndex) {
    setActivePlayer((activePlayer) => {
      return activePlayer === 'X' ? 'O' : 'X';
    });
    setGameTurns((gameTurns) => {
      let currentPlayer = gameTurns.length % 2 === 0 ? 'X' : 'O';

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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
