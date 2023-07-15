"use client"
import { useRouter } from "next/navigation"

import IconButton from "./IconButton"
import {BiUserCircle, BiSearch, BiHeart} from "react-icons/bi";
import useLoginModal from "@/app/hooks/useLoginModal";
import Container from "./Container";

const BottomBar = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
  return (
    <footer className="  w-full  p-3.5 md:hidden fixed bottom-0 bg-white z-50 border-t-[1px] text-gray  ">
        <Container>
                <div className="w-9/10 sm:w-2/4 flex  mx-auto justify-center items-center ">
                    <IconButton  onClick={() => router.push("/")}  icon={BiSearch} label="Explore" />
                    <IconButton  onClick={() => router.push("/favorites")}   icon={BiHeart} label="Wishlist" />
                    <IconButton  onClick={() => loginModal.onOpen()} icon={BiUserCircle} label="Log in" />
                </div>
        </Container>
    </footer>
  )
}

export default BottomBar