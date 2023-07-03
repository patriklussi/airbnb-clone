"use client"
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import Usermenu from "./Usermenu";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="p-4 border-b[1px]">

        <Container>
              <div className="flex items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <Search/>
                <Usermenu/>
              </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
