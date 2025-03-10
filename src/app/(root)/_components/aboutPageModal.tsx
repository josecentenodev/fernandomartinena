import { Image, Group, Stack, Text } from "@mantine/core";
import React from "react";

const AboutPageModal = () => {
  return (
    <Group justify="flex-start" align="center" pb={'xl'} pl={'xl'}>
      <Image
        src={"/fernando-martinena-ackerman.jpg"}
        alt="Fernando Martinena"
        className="shadow-xl -rotate-6 w-64 h-64 xl:w-96 xl:h-96 object-cover"
      />
      <Stack flex={1} px={'xl'}>
        <Stack pr={'xl'}>
          <Text className="bebas text-5xl text-pink-500" fw={700}>HELLO!</Text>
          <Text className="text-xl">
            My name is <Text span className="text-pink-500">Fernando Martinena</Text>, I&apos;m from
            Argentina and I&apos;m freelance illustrator specialized in{" "}
            <Text span className="text-pink-500">Comics Coloring.</Text>
          </Text>
          <Text className="text-xl">
            In my journey as a freelancer I had the pleasure of working with
            various independent publishers and clients, painting pages for
            comics, magazines. Also I design <Text span className="text-pink-500">Boardgames</Text>,
            illustrations for <Text span className="text-pink-500">TCGs</Text>, and I like creating{" "}
            <Text span className="text-pink-500">Fantastic</Text> art pieces.
          </Text>
        </Stack>
        <Stack>
          <Text className="text-2xl xl:text-3xl bebas">CLIENTS:</Text>
          <Group justify="flex-start" align="baseline">
            <Stack>
              <Text className="text-md xl:text-xl text-pink-500">Tidalwave Productions (Comics)</Text>
              <Text className="text-md xl:text-xl text-pink-500">Acrocomics (Comics)</Text>
              <Text className="text-md xl:text-xl text-pink-500">Finca los Funes (wines)</Text>
            </Stack>
            <Stack justify="flex-start" align="baseline">
              <Text className="text-md xl:text-xl text-pink-500">Defcon Juegos (Boardgames)</Text>
              <Text className="text-md xl:text-xl text-pink-500">Lairen: La historia (Boardgames)</Text>
            </Stack>
          </Group>
        </Stack>
      </Stack>
    </Group>
  );
};

export default AboutPageModal;
