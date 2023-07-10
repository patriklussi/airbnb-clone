"use client"

import { IconType } from "react-icons";

interface CategoryInputProps {
    icon: IconType;
    label:string;
    selected?:boolean;
    onClick: (value:string) => void;
}

const Categoryinput = ({icon :Icon,label,selected,onClick,}: CategoryInputProps) => {
  return (
    <div className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        z-50
        ${selected ? `border-black` : `border-neutral-200`}
    `}  onClick={() => onClick(label)}>
        <Icon size={24}/>
        <p className="font-semibold">
            {label}
        </p>
    </div>
  )
}

export default Categoryinput;