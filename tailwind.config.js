/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        sm: '650px',
        xs: '475px',
      },
    },
    extend: {
      fontFamily: {
        sans: `-apple-system,BlinkMacSystemFont,Helvetica Neue,Segoe UI,Tahoma,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Open Sans,sans-serif`,
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: {
          green: '#126e51',
          title: '#222',
          table: '#777',
          'hover-table': '#959595',
          'minus-cell': '#b71c1c',
          'plus-cell': '#14805e',
          red: '#b71c1c',
          navbar: '#333',
          'green-light': '#26ffbe',
          button: '#474747',
          'clicked-button': '#14805e',
          'button-text': '#bbb',
          'no-result': '#bbb',
          yellow: '#ffdf1b',
          'light-grey': '#e4e4e4',
          'dark-grey': '#333',
          dialog: '#575757',
          'dialog-button': '#c9cad4',
          'disabled-dialog-button': '#aaa',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        topGradient: 'linear-gradient(160deg,#364D3C 0%, #383838 400px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('flowbite/plugin')],
}
