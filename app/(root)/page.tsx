"use client";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, UnstyledButton } from "@mantine/core";
import { SetStateAction, useState } from "react";

export default function Home() {
  const images = Array.from({ length: 9 }, (_, index) => index + 1);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState<null | number>(null);

  const handleClick = (number: number) => {
    setSelectedImage(number);
    open();
  };

  return (
    <main className="grid grid-cols-3 gap-5 mx-auto min-h-screen pt-10">
      {images.map((number) => (
        <UnstyledButton
          onClick={() => handleClick(number)}
          key={number}
        >
          <Image
            src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${number}.png`}
            alt={`Image ${number}`}
            width={500}
            height={500}
          />
        </UnstyledButton>
      ))}

      {selectedImage && (
        <Modal
          opened={opened}
          onClose={close}
          centered
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          <Image
            src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${selectedImage}.png`}
            alt={`Image ${selectedImage}`}
            width={500}
            height={500}
          />
        </Modal>
      )}
    </main>
  );
}
