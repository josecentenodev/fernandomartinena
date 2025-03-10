"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Link from "next/link";

const Banner = () => {
  return (
    <Carousel withIndicators height={300} slideSize="70%" loop align={"center"} slideGap={'xl'} pt={24}>
      <Carousel.Slide>
        <Link href={'#'}>
        <Image
          radius="md"
          src="https://cdnb.artstation.com/p/users/covers/001/688/459/default/3ebd3ca7ba6a52e3b76558c8578ff100.jpg?1692994154"
          alt="Logo Carousel"
          className="w-full h-full object-cover"
        />
        </Link>
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          radius="md"
          src="https://cdnb.artstation.com/p/users/covers/001/688/459/default/3ebd3ca7ba6a52e3b76558c8578ff100.jpg?1692994154"
          alt="Logo Carousel"
          className="w-full h-full object-cover"
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          radius="md"
          src="https://cdnb.artstation.com/p/users/covers/001/688/459/default/3ebd3ca7ba6a52e3b76558c8578ff100.jpg?1692994154"
          alt="Logo Carousel"
          className="w-full h-full object-cover"
        />
      </Carousel.Slide>
    </Carousel>
  );
};

export { Banner };
