import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F8FC",
        surface: "#FFFFFF",
        primary: "#586AF5",
        secondary: "#8A68F7",
        progress: "#42D7C5",
        accent: "#FF8068",
        text: {
          main: "#11172A",
          muted: "#667085",
          light: "#F8FAFF",
          dark: "#09101F",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'hero-light': 'radial-gradient(circle at 50% 0%, rgba(88, 106, 245, 0.08) 0%, rgba(247, 248, 252, 0) 70%)',
      }
    },
  },
  plugins: [],
};
export default config;