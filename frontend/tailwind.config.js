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
        // Tactical / Defence palette
        tac: {
          950: '#050706',
          900: '#0A0E0C',
          850: '#0F1412',
          800: '#131817',
          700: '#1B211F',
          600: '#242A28',
          500: '#3A423F',
          400: '#5A6360',
          300: '#8B9088',
          200: '#B9BEB8',
          100: '#E8E4D8',   // tactical bone / warm white
        },
        amber: {
          warn: '#E87722',   // safety amber
          hot:  '#F49B4C',
          dim:  '#7A3F14',
        },
        od: {
          green: '#7A8B47',   // OD / olive drab highlight
          dark:  '#4A5D23',
          fade:  '#2D3818',
        },
        signal: {
          red: '#C13B2A',
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
