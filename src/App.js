import React from 'react';
import GameState from './GameState';
import Tile from './Tile';
import './App.css';

function useGameState() {
  const gameState = GameState.getInstance();
  const [state, setState] = React.useState(gameState.getState());

  function newGame() {
    gameState.startNewGame();
    setState(gameState.getState());
  }

  function undo() {
    gameState.undo();
    setState(gameState.getState());
  }

  function move(index) {
    return function () {
      gameState.moveTile(index);
      setState(gameState.getState());
    }
  }

  React.useEffect(() => {
    function listeners(event) {

      if (event.keyCode === 37) gameState.moveInDirection('left');
      else if (event.keyCode === 38) gameState.moveInDirection('up');
      else if (event.keyCode === 39) gameState.moveInDirection('right');
      else if (event.keyCode === 40) gameState.moveInDirection('down');

      setState(gameState.getState());
    }

    document.addEventListener('keyup', listeners);

    return (() => window.removeEventListener(listeners));
  }, [gameState]);

  return [state.board, state.moves, state.solved, newGame, undo, move];
}

function App() {
  const [board, moves, solveds, newGame, undo, move] = useGameState();
  const solved = true;

  return (
    <div>
      { solved ?
        <div className='msg-container'>
          <p>Ho has aconseguit NÚRIA! Felicitats!!! 🎉🎊🎉🎊</p>
          <p>No ho dubtava! Estas feta tota una hacker!</p>
          <p>Ja que som germanes d'altres dimensions m'agradaria compartir amb tu el botí d'aquest hackeig.</p>
          <p>El primer que hem trobat esta al maleter de l'Almera. Ja m'ensenyaras que és!</p>
          <p>El segon esta radera d'aquest link pero el problema es que esta encriptat.</p>
          <p>Hem descubert que és un xifratge Cèsar, pero no sabem que significa.</p>
          <p>iuuq://cju.mz/sfhbm-ovsjb</p>
        </div>
      :
        <div>
          <div className='game-container'>
            <div className='board'>
              {
                board.slice(0, -1).map((pos, index) => (
                  <Tile index={index} pos={pos} onClick={move(index)} />
                ))
              }
            </div>
            <button className='big-button' onClick={undo}> ENRERE </button>
          </div>
        </div>
        }
      </div>
  );
}

export default App;
