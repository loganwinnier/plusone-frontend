/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ["bruna", "sans-serif"],
        'venice': ["venice-blvd", "sans-serif"],
        'wide': ["roc-grotesk-wide", "sans-serif"],

      },
      backgroundImage: {
        'bg-texture': "url('./plus.svg')",
        'bg-texture-2': "url('./autumn.svg')",
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#11324e",
          "secondary": "#ee9532",
          "accent": "#008dff",
          "neutral": "#323231",
          "base-100": "#fbfefa",
          "info": "#1886ca",
          "success": "#64ff5b",
          "warning": "#f0a232",
          "error": "#ef3d34",
        },
      },
    ],
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements'
    }),
    require("daisyui"),],

}

