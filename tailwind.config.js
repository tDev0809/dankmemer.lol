const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	darkMode: "class",
	purge: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/util/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["Montserrat"],
			},
			colors: {
				dank: {
					100: "#65ce8f",
					200: "#199532",
					300: "#14763d",
					400: "#1e271f",
					500: "#171f19",
					600: "#121b13",
					700: "#0b110c",
					800: "#080c08",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
