/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'active': '#eb347a',
      },
    },
  },
  plugins: [require("daisyui"),  require('flowbite/plugin'), require("tw-elements/dist/plugin.cjs")],
  daisyui: {
    styled: true,
    themes: ["cupcake"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    //darkTheme: "dark",
  },
}

