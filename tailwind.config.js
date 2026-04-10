/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#17A354',
          light: '#4caf50',
        },
        secondary: '#2e7d32',
        dark: '#333333',
        light: '#ffffff',
        error: '#e74c3c',
        success: '#2ecc71',
        gray: '#dee2e6',
        bg: {
          light: '#f9f9f9',
        }
      },
      fontFamily: {
        body: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
