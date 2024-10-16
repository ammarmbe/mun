import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          25: "rgba(var(--gray-25))",
          50: "rgba(var(--gray-50))",
          100: "rgba(var(--gray-100))",
          200: "rgba(var(--gray-200))",
          300: "rgba(var(--gray-300))",
          400: "rgba(var(--gray-400))",
          500: "rgba(var(--gray-500))",
          600: "rgba(var(--gray-600))",
          700: "rgba(var(--gray-700))",
          800: "rgba(var(--gray-800))",
          900: "rgba(var(--gray-900))",
          950: "rgba(var(--gray-950))",
        },
        brand: {
          25: "rgba(var(--brand-25))",
          50: "rgba(var(--brand-50))",
          100: "rgba(var(--brand-100))",
          200: "rgba(var(--brand-200))",
          300: "rgba(var(--brand-300))",
          400: "rgba(var(--brand-400))",
          500: "rgba(var(--brand-500))",
          600: "rgba(var(--brand-600))",
          700: "rgba(var(--brand-700))",
          800: "rgba(var(--brand-800))",
          900: "rgba(var(--brand-900))",
          950: "rgba(var(--brand-950))",
        },
        error: {
          25: "rgba(var(--error-25))",
          50: "rgba(var(--error-50))",
          100: "rgba(var(--error-100))",
          200: "rgba(var(--error-200))",
          300: "rgba(var(--error-300))",
          400: "rgba(var(--error-400))",
          500: "rgba(var(--error-500))",
          600: "rgba(var(--error-600))",
          700: "rgba(var(--error-700))",
          800: "rgba(var(--error-800))",
          900: "rgba(var(--error-900))",
          950: "rgba(var(--error-950))",
        },
        warning: {
          25: "rgba(var(--warning-25))",
          50: "rgba(var(--warning-50))",
          100: "rgba(var(--warning-100))",
          200: "rgba(var(--warning-200))",
          300: "rgba(var(--warning-300))",
          400: "rgba(var(--warning-400))",
          500: "rgba(var(--warning-500))",
          600: "rgba(var(--warning-600))",
          700: "rgba(var(--warning-700))",
          800: "rgba(var(--warning-800))",
          900: "rgba(var(--warning-900))",
          950: "rgba(var(--warning-950))",
        },
        success: {
          25: "rgba(var(--success-25))",
          50: "rgba(var(--success-50))",
          100: "rgba(var(--success-100))",
          200: "rgba(var(--success-200))",
          300: "rgba(var(--success-300))",
          400: "rgba(var(--success-400))",
          500: "rgba(var(--success-500))",
          600: "rgba(var(--success-600))",
          700: "rgba(var(--success-700))",
          800: "rgba(var(--success-800))",
          900: "rgba(var(--success-900))",
          950: "rgba(var(--success-950))",
        },
        "utility-gray": {
          50: "rgba(var(--utility-gray-50))",
          100: "rgba(var(--utility-gray-100))",
          200: "rgba(var(--utility-gray-200))",
          300: "rgba(var(--utility-gray-300))",
          400: "rgba(var(--utility-gray-400))",
          500: "rgba(var(--utility-gray-500))",
          600: "rgba(var(--utility-gray-600))",
          700: "rgba(var(--utility-gray-700))",
          800: "rgba(var(--utility-gray-800))",
          900: "rgba(var(--utility-gray-900))",
        },
        "utility-brand": {
          50: "rgba(var(--utility-brand-50))",
          100: "rgba(var(--utility-brand-100))",
          200: "rgba(var(--utility-brand-200))",
          300: "rgba(var(--utility-brand-300))",
          400: "rgba(var(--utility-brand-400))",
          500: "rgba(var(--utility-brand-500))",
          600: "rgba(var(--utility-brand-600))",
          700: "rgba(var(--utility-brand-700))",
          800: "rgba(var(--utility-brand-800))",
          900: "rgba(var(--utility-brand-900))",
        },
        "utility-error": {
          50: "rgba(var(--utility-error-50))",
          100: "rgba(var(--utility-error-100))",
          200: "rgba(var(--utility-error-200))",
          300: "rgba(var(--utility-error-300))",
          400: "rgba(var(--utility-error-400))",
          500: "rgba(var(--utility-error-500))",
          600: "rgba(var(--utility-error-600))",
          700: "rgba(var(--utility-error-700))",
        },
        "utility-warning": {
          50: "rgba(var(--utility-warning-50))",
          100: "rgba(var(--utility-warning-100))",
          200: "rgba(var(--utility-warning-200))",
          300: "rgba(var(--utility-warning-300))",
          400: "rgba(var(--utility-warning-400))",
          500: "rgba(var(--utility-warning-500))",
          600: "rgba(var(--utility-warning-600))",
          700: "rgba(var(--utility-warning-700))",
        },
        "utility-success": {
          50: "rgba(var(--utility-success-50))",
          100: "rgba(var(--utility-success-100))",
          200: "rgba(var(--utility-success-200))",
          300: "rgba(var(--utility-success-300))",
          400: "rgba(var(--utility-success-400))",
          500: "rgba(var(--utility-success-500))",
          600: "rgba(var(--utility-success-600))",
          700: "rgba(var(--utility-success-700))",
        },
      },
      textColor: {
        primary: "rgba(var(--text-primary))",
        "primary-onbrand": "rgba(var(--text-primary-onbrand))",
        secondary: "rgba(var(--text-secondary))",
        "secondary-onbrand": "rgba(var(--text-secondary-onbrand))",
        tertiary: "rgba(var(--text-tertiary))",
        "tertiary-onbrand": "rgba(var(--text-tertiary-onbrand))",
        quaternary: "rgba(var(--text-quaternary))",
        "quaternary-onbrand": "rgba(var(--text-quaternary-onbrand))",
        disabled: "rgba(var(--text-disabled))",
        placeholder: "rgba(var(--text-placeholder))",
        "placeholder-subtle": "rgba(var(--text-placeholder-subtle))",
        "brand-primary": "rgba(var(--text-brand-primary))",
        "brand-secondary": "rgba(var(--text-brand-secondary))",
        "brand-tertiary": "rgba(var(--text-brand-tertiary))",
        "brand-tertiary-alt": "rgba(var(--text-brand-tertiary-alt))",
        "error-primary": "rgba(var(--text-error-primary))",
        "warning-primary": "rgba(var(--text-warning-primary))",
        "success-primary": "rgba(var(--text-success-primary))",
      },
      borderColor: {
        primary: "rgba(var(--border-primary))",
        secondary: "rgba(var(--border-secondary))",
        tertiary: "rgba(var(--border-tertiary))",
        disabled: "rgba(var(--border-disabled))",
        "disabled-subtle": "rgba(var(--border-disabled-subtle))",
        brand: "rgba(var(--border-brand))",
        "brand-alt": "rgba(var(--border-brand-alt))",
        error: "rgba(var(--border-error))",
        "error-subtle": "rgba(var(--border-error-subtle))",
      },
      backgroundColor: {
        primary: "rgba(var(--bg-primary))",
        "primary-alt": "rgba(var(--bg-primary-alt))",
        "primary-solid": "rgba(var(--bg-primary-solid))",
        secondary: "rgba(var(--bg-secondary))",
        "secondary-alt": "rgba(var(--bg-secondary-alt))",
        "secondary-subtle": "rgba(var(--bg-secondary-subtle))",
        "secondary-solid": "rgba(var(--bg-secondary-solid))",
        tertiary: "rgba(var(--bg-tertiary))",
        quaternary: "rgba(var(--bg-quaternary))",
        active: "rgba(var(--bg-active))",
        disabled: "rgba(var(--bg-disabled))",
        "disabled-subtle": "rgba(var(--bg-disabled-subtle))",
        overlay: "rgba(var(--bg-overlay))",
        "brand-primary": "rgba(var(--bg-brand-primary))",
        "brand-primary-alt": "rgba(var(--bg-brand-primary-alt))",
        "brand-secondary": "rgba(var(--bg-brand-secondary))",
        "brand-solid": "rgba(var(--bg-brand-solid))",
        "brand-section": "rgba(var(--bg-brand-section))",
        "brand-section-subtle": "rgba(var(--bg-brand-section-subtle))",
        "error-primary": "rgba(var(--bg-error-primary))",
        "error-secondary": "rgba(var(--bg-error-secondary))",
        "error-solid": "rgba(var(--bg-error-solid))",
        "warning-primary": "rgba(var(--bg-warning-primary))",
        "warning-secondary": "rgba(var(--bg-warning-secondary))",
        "warning-solid": "rgba(var(--bg-warning-solid))",
        "success-primary": "rgba(var(--bg-success-primary))",
        "success-secondary": "rgba(var(--bg-success-secondary))",
        "success-solid": "rgba(var(--bg-success-solid))",
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
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.125rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      md: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.875rem" }],
      "display-xs": ["1.5rem", { lineHeight: "2rem" }],
      "display-sm": ["1.875rem", { lineHeight: "2.375rem" }],
      "display-md": [
        "2.25rem",
        { lineHeight: "2.75rem", letterSpacing: "-0.02em" },
      ],
      "display-lg": [
        "3rem",
        { lineHeight: "3.75rem", letterSpacing: "-0.02em" },
      ],
      "display-xl": [
        "3.75rem",
        { lineHeight: "4.5rem", letterSpacing: "-0.02em" },
      ],
      "display-2xl": [
        "4.5rem",
        { lineHeight: "5.625rem", letterSpacing: "-0.02em" },
      ],
    },
    boxShadow: {
      none: "none",
      xs: "0px 1px 2px 0px hsla(220, 29%, 5%, 0.05)",
      sm: "0px 1px 3px 0px hsla(220, 29%, 5%, 0.1), 0px 1px 2px -1px hsla(220, 29%, 5%, 0.1)",
      md: "0px 4px 6px -1px hsla(220, 29%, 5%, 0.1), 0px 2px 4px -2px hsla(220, 29%, 5%, 0.06)",
      lg: "0px 12px 16px -4px hsla(220, 29%, 5%, 0.08), 0px 4px 6px -2px hsla(220, 29%, 5%, 0.03), 0px 2px 2px -1px hsla(220, 29%, 5%, 0.04)",
      xl: "0px 20px 24px -4px hsla(220, 29%, 5%, 0.08), 0px 8px 8px -4px hsla(220, 29%, 5%, 0.03), 0px 3px 3px -1.5px hsla(220, 29%, 5%, 0.04)",
      "2xl":
        "0px 24px 48px -12px hsla(220, 29%, 5%, 0.18), 0px 4px 4px -2px hsla(220, 29%, 5%, 0.04)",
      "3xl":
        "0px 32px 64px -12px hsla(220, 29%, 5%, 0.14), 0px 5px 5px -2.5px hsla(220, 29%, 5%, 0.04)",
      "xs-skeuomorphic":
        "0px 0px 0px 1px #0A0D122E inset, 0px -2px 0px 0px #0A0D120D inset, 0px 1px 2px 0px #0A0D120D",
      "focus-ring":
        " 0px 0px 0px 2px rgba(var(--bg-primary)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-alt":
        " 0px 0px 0px 2px rgba(var(--bg-primary-alt)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-error":
        " 0px 0px 0px 2px rgba(var(--bg-error-primary)), 0px 0px 0px 4px rgba(var(--error-500))",
      "focus-ring-shadow-xs":
        "0px 1px 2px 0px #1018280D, 0px 0px 0px 2px rgba(var(--bg-primary)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-shadow-sm":
        "0px 1px 2px 0px #1018280F, 0px 0px 0px 2px rgba(var(--bg-primary)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-alt-shadow-xs":
        "0px 1px 2px 0px #1018280D, 0px 0px 0px 2px rgba(var(--bg-primary-alt)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-alt-shadow-sm":
        "0px 1px 2px 0px #1018280F, 0px 0px 0px 2px rgba(var(--bg-primary-alt)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-error-shadow-xs":
        "0px 1px 2px 0px #1018280D, 0px 0px 0px 2px rgba(var(--bg-primary)), 0px 0px 0px 4px rgba(var(--error-500))",
      "focus-ring-shadow-xs-skeuomorphic":
        "0px 0px 0px 1px #0A0D122E inset, 0px -2px 0px 0px #0A0D120D inset, 0px 1px 2px 0px #0A0D120D, 0px 0px 0px 2px rgba(var(--bg-primary)), 0px 0px 0px 4px rgba(var(--brand-500))",
      "focus-ring-error-shadow-xs-skeuomorphic":
        "0px 0px 0px 1px #0A0D122E inset, 0px -2px 0px 0px #0A0D120D inset, 0px 1px 2px 0px #0A0D120D, 0px 0px 0px 2px rgba(var(--bg-primary)), 0px 0px 0px 4px rgba(var(--error-500))",
    },
    borderRadius: {
      none: "0",
      xxs: "0.125rem",
      xs: "0.25rem",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.625rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.25rem",
      "4xl": "1.5rem",
      full: "9999px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
