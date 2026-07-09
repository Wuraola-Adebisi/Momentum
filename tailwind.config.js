module.exports = {
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
        display: ["Sora", "sans-serif"],
        body: ["Work Sans", "sans-serif"],
        data: ["Roboto Mono", "monospace"],
      },
      maxWidth: {
        content: "1760px",
      },
    },
  },
  plugins: [],
};