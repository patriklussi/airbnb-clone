import { IconType } from "react-icons/lib";

interface ButtonProps {
    label:string;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?:boolean;
    icon?: IconType;

}

const Button = ({label,onClick,disabled,outline,small,icon}:ButtonProps) => {
  return (
    <button
    className=""
    >{label}</button>
  )
}

export default Button; 