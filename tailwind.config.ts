import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animations from '@midudev/tailwind-animations'

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [ animations ],
} satisfies Config;
