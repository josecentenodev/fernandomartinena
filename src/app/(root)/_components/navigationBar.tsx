import React from "react";
import { NavBarLinks, Logo, UserButtons } from ".";
import { MobileMenu } from "./mobileMenu";

const NavBar = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
      {/* Desktop Navigation */}
      <nav className="hidden h-24 w-full items-center justify-between px-10 lg:flex">
        <Logo />
        <NavBarLinks />
        <UserButtons />
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex h-24 w-full items-center justify-between px-6 lg:hidden">
        <Logo />
        <div></div>
        <MobileMenu />
      </nav>
    </header>
  );
};

export { NavBar };
