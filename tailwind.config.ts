import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "inverse-primary": "#d0bcff",
        "on-secondary-container": "#76014e",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#494454",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#d0bcff",
        "error-container": "#ffdad6",
        secondary: "#a43073",
        "on-secondary-fixed": "#3d0026",
        "surface-variant": "#e7e0ed",
        tertiary: "#765700",
        outline: "#7b7486",
        "surface-container-highest": "#e7e0ed",
        "secondary-fixed-dim": "#ffafd3",
        "surface-bright": "#fef7ff",
        "on-secondary-fixed-variant": "#85145a",
        "on-error-container": "#93000a",
        "tertiary-container": "#956e00",
        "primary-fixed": "#e9ddff",
        "on-surface": "#1d1a23",
        "surface-tint": "#6d3bd7",
        "inverse-on-surface": "#f5eefb",
        "on-primary-fixed": "#23005c",
        "surface-dim": "#ded7e4",
        surface: "#fef7ff",
        "secondary-fixed": "#ffd8e7",
        "secondary-container": "#fc79bd",
        "on-secondary": "#ffffff",
        error: "#ba1a1a",
        background: "#FFFDF5",
        "surface-container": "#f3ebf8",
        "on-primary-fixed-variant": "#5516be",
        "on-tertiary-container": "#fffbff",
        "on-primary-container": "#fffbff",
        "on-background": "#1d1a23",
        "on-tertiary-fixed": "#261a00",
        primary: "#8B5CF6",
        "outline-variant": "#cbc3d7",
        "tertiary-fixed-dim": "#f9bd22",
        "surface-container-high": "#ede5f3",
        "surface-container-low": "#f8f1fe",
        "primary-container": "#8455ef",
        "inverse-surface": "#322f39",
        "tertiary-fixed": "#ffdf9f",
        "on-tertiary-fixed-variant": "#5c4300",
        "surface-container-lowest": "#ffffff",
        "slate-dark": "#1d1a23",
        "hot-pink": "#fc79bd",
        amber: "#f9bd22",
        emerald: "#10b981"
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px"
      },
      spacing: {
        gutter: "24px",
        base: "8px",
        sm: "12px",
        margin: "32px",
        lg: "40px",
        xl: "64px",
        md: "24px",
        xs: "4px"
      },
      fontFamily: {
        "body-lg": ["Cairo", "sans-serif"],
        "label-bold": ["Cairo", "sans-serif"],
        "headline-md": ["Cairo", "sans-serif"],
        "display-xl": ["Cairo", "sans-serif"],
        "headline-lg": ["Cairo", "sans-serif"],
        "body-md": ["Cairo", "sans-serif"],
        sans: ["Cairo", "sans-serif"]
      },
      fontSize: {
        "body-lg": [
          "18px",
          {
            lineHeight: "1.6",
            fontWeight: "500"
          }
        ],
        "label-bold": [
          "14px",
          {
            lineHeight: "1.2",
            fontWeight: "700"
          }
        ],
        "headline-md": [
          "24px",
          {
            lineHeight: "1.2",
            fontWeight: "800"
          }
        ],
        "display-xl": [
          "48px",
          {
            lineHeight: "1.1",
            fontWeight: "800"
          }
        ],
        "headline-lg": [
          "32px",
          {
            lineHeight: "1.2",
            fontWeight: "800"
          }
        ],
        "body-md": [
          "16px",
          {
            lineHeight: "1.6",
            fontWeight: "400"
          }
        ]
      }
    }
  },
  plugins: [forms]
};

export default config;
