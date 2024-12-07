import React from "react";
import { NavBarLinks, Logo, UserButtons } from ".";

const Navbar = () => {
  return (
    <header>
      <nav className="flex h-24 w-full items-center justify-center px-10 shadow-sm fixed">
        <Logo />
        <NavBarLinks />
        <UserButtons />
      </nav>
    </header>
  );
};

export { Navbar };
