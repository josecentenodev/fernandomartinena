import { Container, Title, Text } from '@mantine/core'

export default async function Dashboard() {
  return (
    <Container>
      <Title order={2} mb="md">Panel de Administración</Title>
      <Text>
        Bienvenido al panel de administración. Aquí podrás gestionar el contenido de tu sitio web.
      </Text>
    </Container>
  )
}
