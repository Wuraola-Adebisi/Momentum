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
        paper: "#FAF9F6",
        surface: "#FFFFFF",

        ink: "#1A1B1E",
        muted: "#8B92A0",

        primary: "#D9A441",

        status: {
          applied: "#7DA8D9",
          interviewing: "#D9A441",
          offer: "#4CA97A",
          rejected: "#C77B7B",
        },
      },
      fontFamily: {
        display: ["Onest", "sans-serif"],
        body: ["Public Sans", "sans-serif"],
        data: ["IBM Plex Mono", "monospace"],
      },
      maxWidth: {
        content: "1760px",
      },
    },
  },
  plugins: [],
};