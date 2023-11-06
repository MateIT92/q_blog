import { FC } from "react";
import withHelloMessageLoader from "../util/withHelloMessageLoader";

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({ title, onClick, disabled, className }) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};
const ButtonComponent = withHelloMessageLoader(Button, Button.name as string);
export default ButtonComponent;
