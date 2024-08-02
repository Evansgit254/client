module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1234px",
    },
    extend: {
      colors: {
        primary: {
          main: "var(--primary-main)",
          hover: "var(--primary-main-hover)",
        },
        secondary: {
          main: "var(--secondary-main)",
          hover: "var(--secondary-main-hover)",
        },
        tertiary:{
          main:"var(--tertiary-main)",
          hover:"var(--tertiary-main-hover)",
        }
      },
      boxShadow: {
        1: "0px 4px 30px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out forwards",
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
