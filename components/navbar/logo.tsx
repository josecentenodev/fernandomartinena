"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SocialMediaIcons from "./socialmedia";

const Logo = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="hover:cursor-pointer text-xl absolute left-5">
      <div className="flex items-center">
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          className="flex items-center"
        >
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="Fernando Martinena Logo"
              width={100}
              height={100}
            />
          </Link>
          {isShown && <SocialMediaIcons />}
        </div>
      </div>
    </div>
  );
};

export default Logo;
