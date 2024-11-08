/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["CustomFont", "sans-serif"], // 'custom' is the Tailwind font family name
      },
    },
  },
  plugins: [],
};

