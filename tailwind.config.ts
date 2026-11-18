import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coy: {
          pink: "#E9336B",
          "pink-hover": "#D82057",
          "pink-light": "#FFE4EC",
          purple: "#7C3AED",
          "purple-light": "#F0EEFF",
          mint: "#10B981",
          "mint-light": "#D1F4E0",
          card: "#FFFFFF",
          bg: "#F8F8FA",
          dark: "#141416",
          gray: "#6E717C",
          "light-gray": "#EFEFF2",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        coy: "0 4px 20px -2px rgba(20, 20, 22, 0.08)",
        "coy-bold": "0 8px 30px rgba(233, 51, 107, 0.25)",
        card: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};
export default config;

