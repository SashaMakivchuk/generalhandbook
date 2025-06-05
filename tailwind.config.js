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
    },
  },
  plugins: [],
};
