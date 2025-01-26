
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/core-components/**/**/*.{html,js,jsx,ts,tsx}',
    './src/components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './src/hooks/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        sans: ["Open Sans", "sans-serif"]
      },
      colors: {
        primary: '#060606',
      }
    },
  },
  plugins: [],
}