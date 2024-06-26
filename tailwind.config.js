/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./data/**/*.{js,jsx,json}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      md: "865px",
      lg: "1024px",
      xlg: "1450px",
      xl: "1920px",
      "2xl": "2560px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "custom-selected-text": "#ea580c",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      maxWidth: {
        "7xl": "80rem",
        "8xl": "96rem",
        "9xl": "120rem",
      },
    },
    fontSize: {
      "2xs": "0.625rem",
      xs: "0.75rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "2rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "6rem",
      "6xl": "10rem",
      "7xl": "14rem",
      "8xl": "16rem",
      "9xl": "18rem",
      "responsive2xl-4xl": "clamp(2rem, 4vw + 1rem, 4rem)",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
