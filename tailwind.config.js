module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
    },
  },
  plugins: [],
};