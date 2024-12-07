import { z } from "zod";

export const CrearRegistroSchema = z
.object({
  nombre: z
    .string()
    .min(2, { message: "Al menos dos caracteres." })
    .max(20, {
      message: "Máximo 20 caracteres.",
    }),
  email: z
    .string()
    .email("Ingrese una dirección de correo electrónico válida"),
  password: z.string().min(6, {
    message: "La contraseña debe contener al menos seis caracteres.",
  }),
  confirmar: z.string(),
})
.refine((data) => data.password === data.confirmar, {
  message: "Las contraseñas no coinciden",
  path: ["confirmar"],
});

export const RegistrarSchema = z.object({
name: z.string(),
email: z.string().email(),
password: z.string(),
});

export type CrearRegistro = z.infer<typeof CrearRegistroSchema>;
export type Registrar = z.infer<typeof RegistrarSchema>;