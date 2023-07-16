"use client"
import { useRouter } from "next/navigation"
import IconButton from "./IconButton"
import {BiSearch, BiHeart} from "react-icons/bi";
import useLoginModal from "@/app/hooks/useLoginModal";
import Container from "./Container";
import { SafeUser } from "../types";
import Avatar from "./Avatar";
import { useCallback } from "react";


const CustomIconButton = ({src,currentUser , onClick} : {src:string | undefined | null,currentUser:SafeUser | null , onClick: () => void}) => {
 
  return (
    <div  onClick={onClick} className="flex flex-1 flex-col items-center gap-1 text-neutral-500 cursor-pointer "> 
      <Avatar src={src}/>
     {currentUser ? "Profile" : "Log in"}
    </div>
  )
}

const BottomBar = ({currentUser} : {currentUser: SafeUser | null}) => {
    const router = useRouter();
    const loginModal = useLoginModal();


    const handleRouteChange = useCallback(() => {
      if(!currentUser){
        loginModal.onOpen();
      }

      router.push("/favorites");
    },[currentUser,loginModal,router])
    const handleLogin = useCallback(() => {
      if(!currentUser){
        loginModal.onOpen();
      }

      //ADD the user menu open here
    },[currentUser,loginModal])
  return (
    <footer className="  w-full  p-3.5 md:hidden fixed bottom-0 bg-white z-50 border-t-[1px] text-gray  ">
        <Container>
                <div className="w-9/10 sm:w-2/4 flex  mx-auto justify-center items-center ">
                    <IconButton  onClick={() => router.push("/")}  icon={BiSearch} label="Explore" />
                    <IconButton  onClick={handleRouteChange}   icon={BiHeart} label="Wishlist" />
                    <CustomIconButton  onClick={handleLogin} src={currentUser?.image}  currentUser={currentUser}/> 
                </div>
        </Container>
    </footer>
  )
}

export default BottomBar