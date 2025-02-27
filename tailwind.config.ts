/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				'primary-500': '#EBEBD3',
				'primary-600': '#5D5FEF',
				'primary-700': '#1E1E24',
				'primary-400': '#1F2232',
				'secondary-500': '#FFB620',
				'off-white': '#D0DFFF',
				red: '#FF5A5A',
				'dark-1': '#000000',
				'dark-2': '#09090A',
				'dark-3': '#101012',
				'dark-4': '#1F1F22',
				'light-1': '#FFFFFF',
				'light-2': '#EFEFEF',
				'light-3': '#EBEBD3',
				'light-4': '#5C5C7B',
				'light-5': '#242423',
				'light-6': '#76766a',
				'light-7': '#1E1E24',
				'light-8': '#5AB1BB',
				border: "hsl(0, 0%, 85%)", // ✅ Define `border-border` color
				ring: "hsl(0, 0%, 50%)", // ✅ Define `outline-ring`
				background: "hsl(210, 20%, 98%)", // ✅ Define `bg-background`
				foreground: "hsl(222, 47%, 11%)", // ✅ Define `text-foreground`
			},
			screens: {
				xs: '480px',
			},
			width: {
				420: '420px',
				465: '465px',
			},
			fontFamily: {
				poppins: ["var(--poppins)", "sans-serif"],
				bebas: ["var(--bebasNeue)", "sans-serif"],
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
		},
	},
	plugins: [require('tailwindcss-animate')],
};
