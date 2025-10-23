import type { Config } from "tailwindcss";

const TailwindConfig = {
  darkMode: ["class", "dark"],
  content: ["./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default TailwindConfig;
