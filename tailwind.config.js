const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	darkMode: "class",
	purge: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["Montserrat"],
			},
			colors: {
				dank: {
					50: "#65ce8f",
					100: "#199532",
					200: "#14763d",
					250: "#121b13",
					300: "#0b110c",
					400: "#080c08",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
