import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mahogany: "var(--rich-mahogany)",
        "mahogany-2": "var(--rich-mahogany-2)",
        "black-cherry": "var(--black-cherry)",
        "dark-wine": "var(--dark-wine)",
        "brown-red": "var(--brown-red)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
      },
    },
  },
  plugins: [],
};
export default config;
