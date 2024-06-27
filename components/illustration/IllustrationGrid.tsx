// components/IllustrationGrid.tsx
"use client";

import { useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

interface Illustration {
  _id: string;
  title: string;
  imageUrl: string;
}

interface IllustrationGridProps {
  illustrations: Illustration[];
}

const IllustrationGrid = ({ illustrations }: IllustrationGridProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedIllustration, setSelectedIllustration] =
    useState<Illustration | null>(null);

  const handleModalClick = (illustration: Illustration) => {
    setSelectedIllustration(illustration);
    open();
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mx-auto">
        {illustrations.map((illustration) => (
          <div
            key={illustration._id}
            onClick={() => handleModalClick(illustration)}
            className="cursor-pointer"
          >
            <Image
              src={illustration.imageUrl}
              alt={illustration.title}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
      {selectedIllustration && (
        <Modal
          opened={opened}
          onClose={close}
          title={selectedIllustration?.title || ""}
        >
          <Image
            src={selectedIllustration.imageUrl}
            alt={selectedIllustration.title}
            width={1000}
            height={1000}
          />
        </Modal>
      )}
    </>
  );
};

export default IllustrationGrid;
