import { useState } from "react";
import soundX from "./sounds/soundX.mp3";
import soundO from "./sounds/soundO.mp3";
import soundGO from "./sounds/soundGO.mp3";
import { Button } from "./Button";
import { GameOver } from "./GameOver";
import { Board } from "./Board";

const PLAYER_X = "X";
const PLAYER_O = "O";

/**
 * The main component for the Tic-Tac-Toe game.
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strike, setStrike] = useState("");
  const [winner, setWinner] = useState(null);
  const [winCount, setWinCount] = useState([0, 0]);

  /**
   * An array of winning lines in the Tic-Tac-Toe game.
   */
  const winningLines = [
    { combo: [0, 1, 2], strike: "strike-row-1" },
    { combo: [3, 4, 5], strike: "strike-row-2" },
    { combo: [6, 7, 8], strike: "strike-row-3" },
    { combo: [0, 3, 6], strike: "strike-column-1" },
    { combo: [1, 4, 7], strike: "strike-column-2" },
    { combo: [2, 5, 8], strike: "strike-column-3" },
    { combo: [0, 4, 8], strike: "strike-diagonal-1" },
    { combo: [2, 4, 6], strike: "strike-diagonal-2" },
  ];

  /**
   * Plays the audio based on the current player's turn and whether there is a winner.
   * @param {boolean} [winner=false] - Indicates if there is a winner.
   */
  function playAudio(winner = false) {
    if (playerTurn === PLAYER_X) new Audio(soundX).play();
    if (playerTurn === PLAYER_O) new Audio(soundO).play();
    if (winner) new Audio(soundGO).play();
  }

  /**
   * Resets the game state to its initial values.
   */
  function resetGame() {
    setSquares(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrike("");
    setWinner(null);
  }

  /**
   * Checks if there is a winner or a draw based on the given squares.
   * Updates the strike, winner, and winCount states accordingly.
   * @param {Array} newSquares - The updated squares array.
   * @returns {boolean} - Indicates if there is a winner or a draw.
   */
  function handeleCheckWinner(newSquares) {
    for (let i = 0; i < winningLines.length; i++) {
      const { combo, strike } = winningLines[i];
      const [a, b, c] = combo;
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        setStrike(strike);
        setWinner(newSquares[a]);
        setWinCount((prevWinCount) => {
          const newWinCount =
            newSquares[a] === PLAYER_X
              ? [prevWinCount[0] + 1, prevWinCount[1]]
              : [prevWinCount[0], prevWinCount[1] + 1];
          return newWinCount;
        });

        return true;
      }
    }
    if (winner === null && newSquares.indexOf(null) === -1) {
      setWinner("Draw");
      return true;
    }
    return false;
  }

  /**
   * Handles the click event on a square.
   * Updates the squares, playerTurn, and other states based on the click.
   * @param {number} i - The index of the clicked square.
   */
  function handleSquareClick(i) {
    if (squares[i] !== null) return;

    const newSquares = [...squares];
    newSquares[i] = playerTurn;
    setSquares(newSquares);

    playAudio();

    const hasWinner = handeleCheckWinner(newSquares);
    if (!hasWinner) {
      setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
    } else {
      playAudio(true);
      setPlayerTurn("");
    }
  }

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      {gameStarted ? (
        <Board
          squares={squares}
          playerTurn={playerTurn}
          onSquareClick={handleSquareClick}
          strike={strike}
        />
      ) : (
        <Button onClick={() => setGameStarted((gameStarted) => !gameStarted)}>
          Start Game
        </Button>
      )}
      {winner && (
        <div>
          <GameOver winner={winner} winCount={winCount} />
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
}
