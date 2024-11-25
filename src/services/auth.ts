import { signIn } from "next-auth/react";

export const authenticateUser = async (email: string, password: string) => {
  const login = await signIn("credentials", { email, password, redirect: false });
  
  if (login?.status === 200) {
    return { success: true };
  }
  
  return {
    success: false,
    message: "El correo electrónico o la contraseña son incorrectos.",
  };
};
