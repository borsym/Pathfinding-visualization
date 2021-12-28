const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "wall-blue": "#0C3547",
      },
      keyframes: {
        fillBox: {
          "0%": { transform: "scale(0)" },
          "20%": { transform: "scale(0.2)" },
          "40%": { transform: "scale(0.4)" },
          "80%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        fillBox: "fillBox 0.15s ease-in-out",
      },
    },
  },
  plugins: [],
};
