const { width, backgroundColor } = require("tailwindcss/defaultTheme");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      fourK: "1440px",
    },
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

        fillBoxNavbar: {
          "0%": { transform: "scale(0)", "border-radius": "100%" },
          "20%": { transform: "scale(0.2)", "border-radius": "75%" },
          "40%": { transform: "scale(0.4)", "border-radius": "50%" },
          "80%": { transform: "scale(0.8)", "border-radius": "25%" },
          "100%": { transform: "scale(1.1)", "border-radius": "0" },
        },

        fillBoxVisited: {
          // hogy kéne körből - négyzetet csinálni animáció közben
          "0%": {
            transform: "scale(0)",
            backgroundColor: "#c472ff",
            "border-radius": "100%",
          },
          "20%": {
            transform: "scale(0.2)",
            backgroundColor: "#c472ff",
            "border-radius": "85%",
          },
          "40%": {
            transform: "scale(0.4)",
            backgroundColor: "#c472ff",
            "border-radius": "70%",
          },
          "80%": {
            transform: "scale(0.8)",
            backgroundColor: "#4d8de0",
            "border-radius": "55%",
          },
          "100%": {
            transform: "scale(1.1)",
            backgroundColor: "#4d8de0",
            "border-radius": "40%",
          },
        },
      },
      animation: {
        fillBox: "fillBox 0.15s ease-in-out",
        fillBoxVisited: "fillBoxVisited 0.4s ease-in-out",
        fillBoxNavbar: "fillBoxNavbar 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
