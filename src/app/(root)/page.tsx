"use client";
import { Container, Affix, Button, Text, Transition, rem } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { Artworkgrid, Banner } from "./_components";
import { useWindowScroll } from "@mantine/hooks";

export default function Home() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 pt-24">
      <Banner />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              color="dark"
              leftSection={
                <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
      <Container fluid px={"xl"}>
        <Artworkgrid />
      </Container>
    </main>
  );
}
