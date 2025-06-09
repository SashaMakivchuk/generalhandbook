/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,html}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1c2526",
        "card-bg": "#2f3b3c",
        "accent-blue": "#4a90e2",
        "text-light": "#e0e0e0",
        "border-gray": "#444",
        "delete-red": "#c0392b",
        "delete-red-hover": "#e74c3c",
        "action-blue": "#2980b9",
        "action-blue-hover": "#3498db",
        "neutral-gray": "#7f8c8d",
        "neutral-gray-hover": "#95a5a6",
        "error-red": "#e74c3c",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "pulse-slow": "pulse 2s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};
