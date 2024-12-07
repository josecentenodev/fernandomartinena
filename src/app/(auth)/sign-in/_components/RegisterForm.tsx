"use client";
import { api } from "@/trpc/react";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";
import { type CrearRegistro, CrearRegistroSchema, type Registrar } from "@/types/register";


const RegisterForm = () => {
  const { mutate } = api.user.registrar.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Registro exitoso",
        message: "Se ha creado el nuevo usuario",
        color: "green",
      });
      form.reset();
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
    const user: Registrar = {
      name: `${values.nombre}`,
      email: values.email,
      password: values.password,
    };

    mutate({ ...user });
  };
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="max-w-[700px] p-5 flex flex-col gap-5"
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

        <Button type="submit" color="#ea5b1b" className="self-start">
          Registrar
        </Button>
    </form>
  );
};

export { RegisterForm }
