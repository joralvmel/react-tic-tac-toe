import { Strike } from "./Strike";
import { Square } from "./Square";

/**
 * Renders the game board.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.squares - The array of square values.
 * @param {string} props.playerTurn - The current player's turn.
 * @param {Function} props.onSquareClick - The function to handle square click event.
 * @param {string} props.strike - The strike class name.
 * @returns {JSX.Element} The rendered game board.
 */
export function Board({ squares, playerTurn, onSquareClick, strike }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          playerTurn={playerTurn}
          onClick={() => onSquareClick(i)}
        />
      ))}
      <Strike className={`strike ${strike}`} />
    </div>
  );
}
