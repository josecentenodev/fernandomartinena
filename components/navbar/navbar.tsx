import React from "react";
import NavBarLinks from "./navbarlinks";
import Logo from "./logo";
import UserButtons from "./userButtons";

const Navbar = () => {
  return (
    <header>
      <nav className="w-full h-24 flex justify-center items-center shadow-sm px-10">
        <Logo />
        <NavBarLinks />
        <UserButtons />
      </nav>
    </header>
  );
};

export default Navbar;
