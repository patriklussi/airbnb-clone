"use client"

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title:string;
    subTitle: string;
    value:number;
    onChange : (value:number) => void;
}

const Counter = ({title,onChange,subTitle,value}:CounterProps) => {

    const onAdd = useCallback(()=>{
        onChange(value + 1);
    },[onChange,value]);

    const onReduce = useCallback(()=>{
        if(value === 1){
            return;
        }
        onChange(value - 1);
    },[onChange,value])

  return (
    <section className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <div className="font-medium">
                  {title}  
            </div>
            <div className="font-light text-gray-600">
                {subTitle}
            </div>
        </div>
        <div className="flex flex-row items-center gap-4">
        <button onClick={onReduce}  className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center cursor-poiner hover:opacity-80 transition">
            <AiOutlineMinus/>
        </button>
        <div className="font-light text-xl text-neutral-600">
        {value}
        </div>
        <button onClick={onAdd}  className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center cursor-poiner hover:opacity-80 transition">
            <AiOutlinePlus/>
        </button>
        </div>
    </section>
  )
}

export default Counter