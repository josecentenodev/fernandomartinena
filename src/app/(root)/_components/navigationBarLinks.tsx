"use client";
import { UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { modals } from "@mantine/modals";
import AboutPage from "./aboutPageModal";

const NavBarLinks = () => {
  return (
    <div className="flex gap-5 text-2xl">
      <Link href="/">home</Link>
      <UnstyledButton
        className="bebas text-2xl hover:text-primary transition-colors duration-200"
        onClick={() =>
          modals.open({
            size: "2xl",
            children: <AboutPage />,
          })
        }
      >
        ABOUT
      </UnstyledButton>
      <Link href="/news">news</Link>
      <Link href="/shop">shop</Link>
      <Link href="/contact">contact</Link>
    </div>
  );
};

export { NavBarLinks };
