/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Saira Condensed'", "sans-serif"],
        sans: ["'Barlow'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // ---- Grey / Navy Blue palette (rebranded) ----
        // Kept `tac-*` alias so no component rewrites needed. tac-900 is bg base.
        tac: {
          950: '#03071A',   // deepest, for footer / pure black feel
          900: '#061024',   // main bg
          850: '#0B172E',   // section alt bg
          800: '#0F1E3A',   // surface
          700: '#152847',
          600: '#1E355C',
          500: '#2B4573',
          400: '#516B93',
          300: '#8290A6',   // muted text
          200: '#B4BFD1',   // secondary text
          100: '#E7ECF3',   // primary text (near-white with cool tint)
        },
        // `amber-*` alias is now steel-blue (primary accent). Keeping the class names avoids a mass rewrite.
        amber: {
          warn: '#4F8BE0',   // steel blue primary accent
          hot:  '#6EA0EE',   // hover
          dim:  '#25406B',   // subtle dark blue
        },
        // `od-green` alias is now a soft steel-grey (secondary highlight)
        od: {
          green: '#8FA6C7',
          dark:  '#4B617F',
          fade:  '#243044',
        },
        signal: {
          red: '#C74B4B',    // kept for error states
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'sweep': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'blink': { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0.2' } },
        'scan': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'sweep': 'sweep 6s linear infinite',
        'blink': 'blink 1.4s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
