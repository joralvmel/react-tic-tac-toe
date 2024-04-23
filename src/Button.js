/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the button.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button element.
 */
export function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
