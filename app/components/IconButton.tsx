import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  label?: string;
  onClick?: () => void;
}

const IconButton = ({ icon: Icon, label,onClick }: IconButtonProps) => {
   


  return (
    <button onClick={onClick} className="flex flex-1 flex-col items-center gap-1 text-neutral-500 ">
      <Icon size={24}  />
      {label}
    </button>
  );
};

export default IconButton;
