"use client";
import { Container, Title, TextInput, Textarea, Button, Paper, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { api } from '@/trpc/react';
import { showNotification } from '@mantine/notifications';

export default function ContactPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'El nombre es muy corto' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? 'Email inválido' : null,
      subject: (value) => value.trim().length < 3 ? 'El asunto es muy corto' : null,
      message: (value) => value.trim().length < 10 ? 'El mensaje es muy corto' : null,
    }
  });

  const { mutate, isPending } = api.messages.send.useMutation({
    onSuccess: () => {
      showNotification({
        title: 'Mensaje enviado',
        message: 'Gracias por contactarnos. Te responderemos pronto.',
        color: 'green'
      });
      form.reset();
    },
    onError: (error) => {
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red'
      });
    }
  });

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="md" p={30} radius="md" mt={30}>
        <Title order={2} ta="center" mb="xl">Contacto</Title>
        
        <form onSubmit={form.onSubmit((values) => mutate(values))}>
          <Stack>
            <TextInput
              label="Nombre"
              placeholder="Tu nombre"
              required
              {...form.getInputProps('name')}
            />
            
            <TextInput
              label="Email"
              placeholder="tu@email.com"
              required
              {...form.getInputProps('email')}
            />

            <TextInput
              label="Asunto"
              placeholder="Asunto del mensaje"
              required
              {...form.getInputProps('subject')}
            />

            <Textarea
              label="Mensaje"
              placeholder="Tu mensaje"
              minRows={4}
              required
              {...form.getInputProps('message')}
            />

            <Button 
              type="submit" 
              loading={isPending}
              color="dark"
            >
              Enviar Mensaje
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}