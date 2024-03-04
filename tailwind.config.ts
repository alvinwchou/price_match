import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    height: {
      "10vh": "10vh",
      "20vh": "20vh",
      "30vh": "30vh",
      "40vh": "40vh",
      "50vh": "50vh",
      "60vh": "60vh",
      "70vh": "70vh",
      "80vh": "80vh",
      "90vh": "90vh",
      "100vh": "100vh",
    },
  },
  plugins: [],
};
export default config;
