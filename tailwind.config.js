import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        "persian-green": {
          50: "#effefc",
          100: "#c7fff6",
          200: "#90ffed",
          300: "#51f7e3",
          400: "#1de4d2",
          500: "#04c8b9",
          600: "#00aaa1",
          700: "#05807a",
          800: "#0a6562",
          900: "#0d5452",
          950: "#003233",
        },
        shark: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#222222",
        },
        "picton-blue": {
          50: "#f2f8fd",
          100: "#e5eff9",
          200: "#c5dff2",
          300: "#91c4e8",
          400: "#6ab0de",
          500: "#318bc6",
          600: "#216ea8",
          700: "#1c5888",
          800: "#1b4b71",
          900: "#1b405f",
          950: "#12293f",
        },
        mantis: {
          50: "#f4faf3",
          100: "#e4f5e3",
          200: "#c8eac8",
          300: "#9cd99c",
          400: "#78c578",
          500: "#44a344",
          600: "#348534",
          700: "#2c692d",
          800: "#275428",
          900: "#214622",
          950: "#0e250f",
        },
        tacao: {
          50: "#fdf6ef",
          100: "#fbead9",
          200: "#f6d3b2",
          300: "#f0b37e",
          400: "#e98d4e",
          500: "#e46e2b",
          600: "#d55621",
          700: "#b1411d",
          800: "#8d351f",
          900: "#722e1c",
          950: "#3d150d",
        },
        sunglo: {
          50: "#fdf3f3",
          100: "#fbe6e5",
          200: "#f8d1d0",
          300: "#f2b1af",
          400: "#e98380",
          500: "#e06f6c",
          600: "#c73f3b",
          700: "#a7312e",
          800: "#8b2c29",
          900: "#742a28",
          950: "#3e1211",
        },
      },
      keyframes: {
  			fadeInDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			fadeInDown: 'fadeInDown 0.3s ease-out'
  		}
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
