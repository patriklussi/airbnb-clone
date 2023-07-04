"use client"
import Container from "../Container";
import {} from "@prisma/client"
import Logo from "./Logo";
import Search from "./Search";
import Usermenu from "./Usermenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar = ({currentUser}: NavbarProps) => {

  return (
    <nav className="fixed w-full bg-white z-10 ">
      <div className="p-4 border-b[1px] shadow-sm">

        <Container>
              <div className="flex items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <Search/>
                <Usermenu currentUser={currentUser}/>
              </div>
        </Container>
      </div>
      <Categories/>
    </nav>
  );
};

export default Navbar;
