"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from "./dotButtons";
import Image from "next/image";
import './embla.css'

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDES = [
  { id: "1", src: "https://picsum.photos/600/350?v=1", description: '', href: '' },
  { id: "2", src: "https://picsum.photos/600/350?v=2", description: '', href: '' },
  { id: "3", src: "https://picsum.photos/600/350?v=3", description: '', href: '' },
  { id: "4", src: "https://picsum.photos/600/350?v=4", description: '', href: '' },
  { id: "5", src: "https://picsum.photos/600/350?v=5", description: '', href: '' },
];


const EmblaCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Fade(), Autoplay({delay: 5000})]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla">
      <div
        className="embla__viewport"
        ref={emblaRef}
      >
        <div className="embla__container">
          {SLIDES.map((img) => (
            <div
              className="embla__slide"
              key={img.id}
            >
              <Image
                className="embla__slide__img"
                src={`https://picsum.photos/600/350?v=${img.src}`}
                alt="Your alt text"
                width={600}
                height={350}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
