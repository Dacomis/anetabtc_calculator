module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        anetaCyan: "#34708d",
        anetaGold: "#f6c472",
        cardanoBlue: "#0033AD",
      },
      keyframes: {
        "0%, 100%": { transform: "scale(1,1)    translateY(0)" },
        "10%": { transform: "scale(1.1,.9) translateY(0)" },
        "30%": { transform: "scale(.9,1.1) translateY(-100px)" },
        "50%": { transform: "scale(1,1)    translateY(0)" },
      },
      animation: {
        bounce: "bounce 900ms",
      },
    },
  },
  plugins: [],
};
