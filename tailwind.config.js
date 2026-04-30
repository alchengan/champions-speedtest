/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsxx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flash: {
          "0%": { backgroundColor: "#cbd5e1" },
          "100%": { backgroundColor: "#ffffff" },
        },
      },
      animation: {
        flash: "flash 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
