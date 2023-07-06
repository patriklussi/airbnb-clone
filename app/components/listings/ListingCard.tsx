"use client"
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ListingCardProps {
data:Listing;
reservation?: Reservation;
onAction?: (id:string) => void;
disabled?: boolean;
actionLabel?: string;
actionId?:string;
currentUser?: SafeUser | null;
}

const ListingCard = ({data,actionId,actionLabel,currentUser,disabled,onAction,reservation}: ListingCardProps) => {
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue);
    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation();
    },[])
  return (
    <div>


    </div>
  )
}

export default ListingCard