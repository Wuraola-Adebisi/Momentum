export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px", "3xl": "1920px" },
    extend: {
      colors: {
        paper: "#F5F4EF", surface: "#FFFDF8", ink: "#10213B", muted: "#667085",
        primary: "#2457FF", accent: "#FF6B4A", line: "#DCE1EA",
        status: { applied: "#2457FF", interviewing: "#7357D8", offer: "#15966D", rejected: "#D95C5C" },
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["Instrument Sans", "Arial", "sans-serif"],
        data: ["DM Mono", "monospace"],
      },
      maxWidth: { content: "1760px" },
      boxShadow: {
        soft: "0 12px 32px rgba(16, 33, 59, 0.07)",
        lift: "0 18px 48px rgba(16, 33, 59, 0.12)",
      },
      keyframes: {
        "toast-in": { "0%": { opacity: "0", transform: "translateY(0.5rem)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { "toast-in": "toast-in 0.2s ease-out", "fade-up": "fade-up 0.35s ease-out both" },
    },
  },
  plugins: [],
};