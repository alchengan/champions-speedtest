/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsxx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flash: {
          "0%": { backgroundColor: "oklch(86.9% 0.022 252.894)" },
          "100%": { backgroundColor: "oklch(70.4% 0.04 256.788)" },
        },
      },
      animation: {
        flash: "flash 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
