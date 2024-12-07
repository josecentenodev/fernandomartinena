import React from "react";
import { NavBarLinks, Logo, UserButtons } from ".";

const NavBar = () => {
  return (
    <header>
      <nav className="flex h-24 w-full items-center justify-center px-10 shadow-sm fixed z-50 bg-white">
        <Logo />
        <NavBarLinks />
        <UserButtons />
      </nav>
    </header>
  );
};

export { NavBar };
