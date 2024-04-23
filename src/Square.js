/**
 * Renders a square component.
 *
 * @param {Object} props - The props object.
 * @param {string|null} props.value - The value of the square.
 * @param {string} props.playerTurn - The current player's turn.
 * @param {function} props.onClick - The click event handler for the square.
 * @returns {JSX.Element} The rendered square component.
 */
export function Square({ value, playerTurn, onClick }) {
  return (
    <div
      value={value}
      onClick={onClick}
      className={`square ${value === null ? `${playerTurn}-hover` : ""}`}
    >
      {value}
    </div>
  );
}
