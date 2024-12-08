import { fontFamily } from "tailwindcss/defaultTheme";
import animations from '@midudev/tailwind-animations'
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [ animations ],
})
