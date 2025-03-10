import { fontFamily } from "tailwindcss/defaultTheme";
import animations from '@midudev/tailwind-animations'
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f50057',
          light: '#ff4081',
          dark: '#c51162'
        },
        secondary: {
          DEFAULT: '#212121',
          light: '#484848',
          dark: '#000000'
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        bebas: ["Bebas Neue", "sans-serif"],
        oldStandard: ["Old Standard TT", "serif"]
      }
    },
  },
  plugins: [ animations ],
})
