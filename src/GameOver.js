/**
 * Renders the game over component.
 * @param {Object} props - The component props.
 * @param {string} props.winner - The winner of the game. Can be "Draw" or the player's name.
 * @param {number[]} props.winCount - The win count for each player. The first element represents the win count for "X" and the second element represents the win count for "O".
 * @returns {JSX.Element} The game over component.
 */
export function GameOver({ winner, winCount }) {
  return (
    <div className="game-over">
      <h3>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins`}</h3>
      <div>{`Score:  X:${winCount[0]} O:${winCount[1]}`}</div>
    </div>
  );
}
