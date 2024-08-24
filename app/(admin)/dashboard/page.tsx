import { Container, Title, Text, Space, Button, Group } from '@mantine/core';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <Container>
      <Title>¡Bienvenido, Fernando Martinena!</Title>
      <Space h="md" />
      <Text size="lg">
        Me alegra tenerte por aquí. Este es tu espacio personal para gestionar tus contenidos. 
        Gracias por la oportunidad de dar vida a esta web tu arte digital. 
      </Text>
      <Space h="xl" />
      <Text size="md">
        Sobre el lateral izquierdo vas a encontrar los links para editar las distintas secciones de tu web.
        Si necesitas ayuda, no dudes en hablarme. Estoy para apoyarte en cada paso del camino.
      </Text>
    </Container>
  );
}
