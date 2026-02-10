import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        inkBlack: "var(--ink-black)",
        nightBordeaux: "var(--night-bordeaux)",
        blackCherry: "var(--black-cherry)",
        oxblood: "var(--oxblood)",
        brickEmber: "var(--brick-ember)",
        redOchre: "var(--red-ochre)",
        cayenneRed: "var(--cayenne-red)",
        deepSaffron: "var(--deep-saffron)",
        orange: "var(--orange)",
        amberFlame: "var(--amber-flame)",
      },
    },
  },
  plugins: [],
};
export default config;
