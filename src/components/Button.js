export const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className="h-6 rounded bg-stone-300 text-stone-900 px-2 border border-stone-400 hover:bg-stone-400 hover:text-stone-900 transition-colors duration-200"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
