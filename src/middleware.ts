import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Protección de rutas con middleware de NextJS
  // Obtén el token de la sesión actual
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Proteccón de Dashboard
  const dashboardRoutes = ["/dashboard"];

  // Verificar el userType para rutas de dashboard
  if (
    token &&
    dashboardRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    const userType = token.userType;

    if (userType !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Si hay un token o la ruta es pública, continúa con la solicitud
  return NextResponse.next();
}

export const config = {
  // Configura en qué rutas se debe ejecutar el middleware
  matcher: [
    // Regex que protege todas las rutas menos los archivos estáticos para que cargue correctamente la UI (negative lookaheads)
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico).*)",
  ],
};
