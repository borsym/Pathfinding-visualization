const { width, backgroundColor } = require("tailwindcss/defaultTheme");
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
        "visited-node-blue": "#40cde3",
        "answer-background-grey": "#f0f0f0",
      },
      keyframes: {
        fillBox: {
          "0%": { transform: "scale(0)" },
          "20%": { transform: "scale(0.2)" },
          "40%": { transform: "scale(0.4)" },
          "80%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1.1)" },
        },

        fillBoxVisited: {
          // hogy kéne körből - négyzetet csinálni animáció közben
          "0%": { transform: "scale(0.2)", backgroundColor: "#c472ff" },
          "40%": { transform: "scale(0.4)", backgroundColor: "#c472ff" },
          "100%": { transform: "scale(1.1)", backgroundColor: "#4d8de0" },
        },
      },
      animation: {
        fillBox: "fillBox 0.15s ease-in-out",
        fillBoxVisited: "fillBoxVisited 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
