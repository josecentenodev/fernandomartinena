"use client";
import { Container, Affix, Button, Transition, rem } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { Banner } from "./banner";

const PageContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 pt-24">
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
        {children}
      </Container>
    </main>
  );
};

export default PageContainer;
