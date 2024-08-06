/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "1rem",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			keyframes: {
				reveal: {
					"0%": {
						opacity: "0",
						scale: "0.75",
					},
					"100%": {
						opacity: "1",
						scale: "1",
					},
				},
			},

			animation: {
				reveal: "reveal 5s linear forwards",
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
