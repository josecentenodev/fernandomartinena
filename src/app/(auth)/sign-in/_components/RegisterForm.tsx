"use client";
import { api } from "@/trpc/react";
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";
import {
  type CrearRegistro,
  CrearRegistroSchema,
  type Registrar,
} from "@/types/register";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter()
  const [cargando, setCargando] = useState(false);
  const { mutate } = api.user.registrar.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Registro exitoso",
        message: "Se ha creado el nuevo usuario",
        color: "green",
      });
      form.reset();
      setCargando(false)
      router.push('/')
    },
    onError: (e) => {
      showNotification({
        title: "Error al crear usuario",
        message: e.message,
        color: "red",
      });
    },
  });

  const form = useForm<CrearRegistro>({
    validate: zodResolver(CrearRegistroSchema),
    validateInputOnChange: true,
    initialValues: {
      email: "",
      nombre: "",
      password: "",
      confirmar: "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setCargando(true);
    const user: Registrar = {
      name: `${values.nombre}`,
      email: values.email,
      password: values.password,
    };

    mutate({ ...user });
  };
  return (
    <Stack justify="center" align="center" pb={"xl"} mt={"-xl"}>
      <Image
        src={"/Logo.png"}
        alt="Fernando Martinena Logo"
        width={200}
        height={200}
      />
      <Card w={500} mx="auto" p="lg" shadow="md" withBorder radius="md">
        <LoadingOverlay visible={cargando} />
        <Group justify="center" py="md">
          <Title order={1}>Registro</Title>
        </Group>
        <Box pt="xs">
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex max-w-[700px] flex-col gap-2 p-5"
          >
            <TextInput
              label="Nombre"
              placeholder="nombre"
              {...form.getInputProps("nombre")}
            />

            <TextInput
              label="E-mail"
              name="email"
              placeholder="correo electrónico"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Contraseña"
              placeholder="Contraseña"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              {...form.getInputProps("confirmar")}
            />

            <Button type="submit" color="#ea5b1b" mt={'xl'}>
              Registrar
            </Button>
          </form>
        </Box>
      </Card>
    </Stack>
  );
};

export { RegisterForm };
