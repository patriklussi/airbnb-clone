"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { BiGlobe } from "react-icons/bi";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react"
import { SafeUser } from "@/app/types";
interface UsermenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UsermenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative flex-1 ">
      <div className=" hidden md:flex items-center justify-end gap-3 ">
        <div className="flex mr-2 ">
          <button
            onClick={() => {}}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Airbnb your home
          </button>
          <button
            className="hidden py-3 px-4  lg:block rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => {}}
          >
            <BiGlobe size={16} />
          </button>
        </div>

        <button
          onClick={toggleOpen}
          className="  p-4  md:py-1 md:px-2  border-[1px] border-neutral-200 flex  items-center gap-3 rounded-full cursor-poiner hover:shadow-md transtion"
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar  src={currentUser?.image}/>
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw]  md:w-2/4 lg:w-2/4 xl:w-1/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col ">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={()=>{}} label="My favorties" />
                <MenuItem onClick={()=>{}} label="My reservations" />
                <MenuItem onClick={()=>{}} label="My properties" />
                <MenuItem onClick={()=>{}} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={()=> signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Log in" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
