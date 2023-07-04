"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
const Logo = () => {
    const router = useRouter();

  return (
   <div className=" md:mr-2 lg:mr-0 lg:flex-1">
  <Image
    onClick={() => router.push("/")}
   alt="Logo"
   className="hidden md:block cursor-pointer flex-0"
   height={100}
   width={100}
   src="/images/logo.png"
   />
   </div>
 
  )
}

export default Logo