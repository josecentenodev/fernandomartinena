"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Link from "next/link";
import { api } from "@/trpc/react";
import NextImage from "next/image";

const Banner = () => {
  const { data: banners, isLoading } = api.banners.getAll.useQuery();

  if (isLoading || !banners) {
    return null;
  }

  return (
    <Carousel 
      height={400}
      dragFree
      loop 
      align="center" 
      slideGap="xl" 
      slideSize="90%"
      pt={24}
      classNames={{
        root: "w-full max-w-[1920px] mx-auto",
        viewport: "px-4",
      }}
    >
      {banners.map((banner) => (
        <Carousel.Slide key={banner.id}>
          <Link href="#" className="block w-full h-full">
            <div className="relative w-full h-full">
              <Image
                component={NextImage}
                radius="md"
                src={banner.imageUrl ?? ""}
                alt={banner.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
              />
            </div>
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export { Banner };
