import { Container } from "@mantine/core";
import { Artworkgrid, Banner } from "./_components";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-24 gap-12">
      <Banner />
      <Container fluid px={'xl'}>
      <Artworkgrid />
      </Container>
    </main>
  );
}
