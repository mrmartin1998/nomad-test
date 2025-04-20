/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'base-100': '#ffffff',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "base-100": "#ffffff",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    rtl: false,
  }
}