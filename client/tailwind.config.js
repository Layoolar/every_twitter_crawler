/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/presentation/**/**/*.{ts,tsx}'],
	theme: {
		colors: {
			text: {
				50: 'var(--text-50)',
				100: 'var(--text-100)',
				200: 'var(--text-200)',
				300: 'var(--text-300)',
				400: 'var(--text-400)',
				500: 'var(--text-500)',
				600: 'var(--text-600)',
				700: 'var(--text-700)',
				800: 'var(--text-800)',
				900: 'var(--text-900)',
				950: 'var(--text-950)',
			},
			background: {
				50: 'var(--background-50)',
				100: 'var(--background-100)',
				200: 'var(--background-200)',
				300: 'var(--background-300)',
				400: 'var(--background-400)',
				500: 'var(--background-500)',
				600: 'var(--background-600)',
				700: 'var(--background-700)',
				800: 'var(--background-800)',
				900: 'var(--background-900)',
				950: 'var(--background-950)',
			},
			primary: {
				50: 'var(--primary-50)',
				100: 'var(--primary-100)',
				200: 'var(--primary-200)',
				300: 'var(--primary-300)',
				400: 'var(--primary-400)',
				500: 'var(--primary-500)',
				600: 'var(--primary-600)',
				700: 'var(--primary-700)',
				800: 'var(--primary-800)',
				900: 'var(--primary-900)',
				950: 'var(--primary-950)',
			},
			secondary: {
				50: 'var(--secondary-50)',
				100: 'var(--secondary-100)',
				200: 'var(--secondary-200)',
				300: 'var(--secondary-300)',
				400: 'var(--secondary-400)',
				500: 'var(--secondary-500)',
				600: 'var(--secondary-600)',
				700: 'var(--secondary-700)',
				800: 'var(--secondary-800)',
				900: 'var(--secondary-900)',
				950: 'var(--secondary-950)',
			},
			accent: {
				50: 'var(--accent-50)',
				100: 'var(--accent-100)',
				200: 'var(--accent-200)',
				300: 'var(--accent-300)',
				400: 'var(--accent-400)',
				500: 'var(--accent-500)',
				600: 'var(--accent-600)',
				700: 'var(--accent-700)',
				800: 'var(--accent-800)',
				900: 'var(--accent-900)',
				950: 'var(--accent-950)',
			},
		},
	},
	// add daisyUI plugin
	plugins: [require('daisyui')],

	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: [
			{
				light: {
					primary: '#18adf2',
					secondary: '#93cc9c',
					accent: '#39938a',
					neutral: '#262626',
					'base-100': '#ededed',
				},
				dark: {
					primary: '#0ea5e9',
					secondary: '#336d3c',
					accent: '#6bc6bd',
					neutral: '#262626',
					'base-100': '#121212',
				},
			},
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: '', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
