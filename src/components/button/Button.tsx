import "./button.css";

interface Props {
  children: React.ReactNode;
  handleLoadMore?: () => void;
  disabled?: boolean;
  styles?: string | undefined;
}
const Button = ({ children, handleLoadMore, disabled, styles }: Props) => {
  return (
    <button
      className={`button p-2 ${styles}`}
      onClick={handleLoadMore}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
