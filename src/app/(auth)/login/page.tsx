"use client";

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
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

const LoginPage = () => {
  const [cargando, setCargando] = useState(false);
  const router = useRouter();
  const form = useForm({
    validate: zodResolver(UserSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormData) => {
    setCargando(true);
    const login = await signIn("credentials", { ...values, redirect: false });
    setCargando(false);
    if (login!.status == 200) {
      return router.push("/");
    }
    showNotification({
      title: "Credenciales incorrectas",
      message: "El correo electrónico o la contraseña son incorrectos.",
      color: "red",
    });
  };

  return (
    <Container h={"100vh"} className="flex items-center justify-center">
      <Stack justify="center" align="center" pb={"xl"} mt={"-xl"}>
        <Image
          src={"/Logo.png"}
          alt="Fernando Martinena Logo"
          width={200}
          height={200}
        />
        <Card w={360} mx="auto" p="lg" shadow="md" withBorder radius="md">
          <LoadingOverlay visible={cargando} />
          <Group justify="center" mb="md">
            <Title order={4}>Iniciar sesión</Title>
          </Group>
          <Box pt="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="E-mail"
                placeholder="Correo electrónico"
                id="email"
                {...form.getInputProps("email")}
                mb="xs"
              />

              <PasswordInput
                label="Contraseña"
                placeholder="Contraseña"
                id="password"
                {...form.getInputProps("password")}
              />

              <Group justify="space-between" mt="xl">
                <Link href="*" passHref className="decoration-transparent">
                  <Text className="cursor-pointer" size="sm">
                    ¿Olvidaste la contraseña?
                  </Text>
                </Link>
                <Button type="submit">Ingresar</Button>
              </Group>
            </form>
          </Box>
        </Card>
        <Card w={360} p="lg" withBorder shadow="md">
          <Group justify="center" gap={"xs"}>
            <Text size="sm">Si todavía no tenés cuenta</Text>
            <Link href="*" passHref className="decoration-transparent">
              registrate aquí
            </Link>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
};

export default LoginPage;