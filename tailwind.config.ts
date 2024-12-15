import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "screen-lvh": "100lvh",
        "screen-vh": "100vh",
      },
      screens: {
        desktop: "961px",
        tablet: "521px",
        mobile: "320px",
        xxl: "1440px",
        xl: "992px",
        md: "540px",
        sm: "375px",
      },
      colors: {
        primary: {
          50: "#F0F5FF",
          100: "#D5E1FF",
          200: "#C1D2FF",
          300: "#A6BEFF",
          400: "#7DA3FA",
          500: "#5588FD",
          600: "#366BE1",
          700: "#2651C1",
          800: "#132E8F",
          900: "#151F56",
        },
        secondary: {
          50: "#EFF2FB",
          100: "#E3E7F6",
          200: "#CFD7F1",
          300: "#B5BFE0",
          400: "#9EAAD3",
          500: "#8490BC",
          600: "#6E7AA3",
          700: "#5A6691",
          800: "#434F79",
          900: "#333957",
        },
        neutral: {
          50: "#F2F2F7",
          100: "#E9E9F1",
          200: "#DBDBE6",
          300: "#CBCBD8",
          400: "#B1B1C3",
          500: "#9292A5",
          600: "#7D7D8E",
          700: "#5F5F6F",
          800: "#464655",
          900: "#313139",
        },
        error: {
          100: "#FFD5D5",
          200: "#FFB7B7",
          300: "#FF9595",
          400: "#F76868",
          500: "#E24A4A",
          600: "#C53A3A",
          700: "#992C2C",
          800: "#732828",
          900: "#531A1A",
        },
        white: "#FFFFFF",
        black: "#151515",
      },
      fontFamily: {
        "pretendard-regular": ["Pretendard", "sans-serif"],
        "pretendard-bold": ["Pretendard-Bold", "sans-serif"],
      },
      fontSize: {
        h0: ["3rem", { lineHeight: "3.75rem", fontWeight: "700" }],
        h1: ["1.5rem", { lineHeight: "1.875rem", fontWeight: "700" }],
        h2: ["1.375rem", { lineHeight: "1.719rem", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.563rem", fontWeight: "700" }],
        h4: ["1.125rem", { lineHeight: "1.406rem", fontWeight: "700" }],
        h5: ["1rem", { lineHeight: "1.25rem", fontWeight: "700" }],
        h6: ["1rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        sub1: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "700" }],
        sub2: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        sub3: ["0.75rem", { lineHeight: "1.25rem", fontWeight: "500" }],
      },
      keyframes: {
        slideRight: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(320%)" },
        },
        maskSlideRight: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(60%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-320%)" },
        },
        maskSlideLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-60%)" },
        },
      },
      animation: {
        slideRight: "slideRight 1s forwards",
        maskSlideRight: "maskSlideRight 1s forwards",
        fadeIn: "fadeIn 1s forwards",
        slideLeft: "slideLeft 1s forwards",
        maskSlideLeft: "maskSlideLeft 1s forwards",
      },
    },
  },
  plugins: [typography],
};

export default config;
