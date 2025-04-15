/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets:[require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        "my-color":" #A18D8D",
      }

    },
  },
  plugins: [],
}

