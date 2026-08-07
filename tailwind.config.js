export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        paper: "#FAFAFA",
        surface: "#FFFFFF",

        ink: "#0B2A4D",
        muted: "#64748B",

        primary: "#2563EB",

        status: {
          applied: "#2563EB",
          interviewing: "#6C4FD9",
          offer: "#1E9E6B",
          rejected: "#DC5B5B",
        },
      },
      fontFamily: {
        display: ["Geist", "sans-serif"],
        body: ["Geist", "sans-serif"],
        data: ["Geist Mono", "monospace"],
      },
      maxWidth: {
        content: "1760px",
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(0.5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
