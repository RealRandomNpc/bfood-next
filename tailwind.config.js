const appColors = {
  "b-primary": {
    100: "#F8D6C2",
    default: "#FF5A00",
  },
  "b-text": {
    600: "#656565",
    900: "#191919",
  },
  "b-bg-primary": "#fff",
  "b-gray": {
    100: "#f6f6f6",
    200: "#eeeeee",
  },
  "b-product": {
    border: "#DBDBDB",
    bg: "#FFFFFF",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: appColors,
      keyframes: {
        toShow: {
          from: {
            display: "none",
            opacity: 0,
          },
          to: {
            display: "block",
            opacity: 1,
          },
        },
        toHide: {
          from: {
            display: "block",
            opacity: 1,
          },
          to: {
            display: "none",
            opacity: 0,
          },
        },
        toShowSideBar: {
          to: {
            display: "flex",
            translate: "100% 0",
          },
        },
      },
      animation: {
        "to-show": "toShow 0.5s ease-in forwards",
        "to-hide": "toHide 0.5s ease-in forwards",
        "to-show-sidebar": "toShowSideBar 0.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};
