"use client";
import { UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { modals } from "@mantine/modals";
import AboutPage from "./aboutPageModal";

const NavBarLinks = () => {
  return (
    <div className="flex items-center gap-8 mx-auto">
      <Link 
        href="/" 
        className="font-bebas text-2xl transition-colors duration-200 hover:text-primary"
      >
        HOME
      </Link>
      <UnstyledButton
        className="font-bebas text-2xl transition-colors duration-200 hover:text-primary focus:outline-primary focus:text-primary"
        onClick={() =>
          modals.open({
            size: "xl",
            children: <AboutPage />,
          })
        }
      >
        ABOUT
      </UnstyledButton>
      <Link 
        href="/news"
        className="font-bebas text-2xl transition-colors duration-200 hover:text-primary"
      >
        NEWS
      </Link>
      <Link 
        href="/shop"
        className="font-bebas text-2xl transition-colors duration-200 hover:text-primary"
      >
        SHOP
      </Link>
      <Link 
        href="/contact"
        className="font-bebas text-2xl transition-colors duration-200 hover:text-primary"
      >
        CONTACT
      </Link>
    </div>
  );
};

export { NavBarLinks };
