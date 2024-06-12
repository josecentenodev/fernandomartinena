/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";
import { withUt } from "uploadthing/tw";

module.exports = withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [animations],
});
