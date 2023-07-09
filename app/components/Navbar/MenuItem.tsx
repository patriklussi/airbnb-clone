"use client"

interface MenuItemProps {
    onClick: () => void;
    label:string;
}



const MenuItem = ({onClick,label}:MenuItemProps) => {


  return (
    <button onClick={onClick} className="px-4 py-3 text-left hover:bg-stone-300  transition font-semibold ">
    {label}
    </button>
  )
}

export default MenuItem