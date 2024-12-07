"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Link from "next/link";

const Banner = () => {
  return (
    <Carousel withIndicators height={400} slideSize="70%" loop align={"center"} slideGap={'xl'}>
      <Carousel.Slide>
        <Link href={'#'}>
        <Image
          radius="md"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          alt="Logo Carousel"
        />
        </Link>
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          radius="md"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          alt="Logo Carousel"
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          radius="md"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          alt="Logo Carousel"
        />
      </Carousel.Slide>
    </Carousel>
  );
};

export { Banner };
