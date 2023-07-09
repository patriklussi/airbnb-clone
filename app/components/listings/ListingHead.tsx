"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

interface ListingHeadProps {
    title:string;
    locationValue:string;
    imageSrc:string;
    id:string;
    currentUser?: SafeUser | null;
}

const ListingHead = ({title,locationValue,imageSrc,id,currentUser}:ListingHeadProps) => {
    
    const {getByValue} = useCountries();

    const location = getByValue(locationValue);
    

  return (
    <div>ListingHead</div>
  )
}

export default ListingHead