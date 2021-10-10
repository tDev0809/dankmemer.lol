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
				inter: ["Inter"],
			},
			colors: {
				dank: {
					100: "#65ce8f",
					200: "#199532",
					300: "#14763d",
				},
				dark: {
					100: "#eafcf1",
					400: "#1e271f",
					500: "#171f19",
					600: "#121b13",
					700: "#0b110c",
					800: "#080c08",
				},
				light: {
					100: "#7f8a7f",
					200: "#2E442E",
					400: "#1e271f",
					500: "#ececec",
					600: "#FBFFFB",
					700: "#ffffff",
					800: "#F0FBF0",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
