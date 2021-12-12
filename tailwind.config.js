module.exports = {
	darkMode: "class",
	content: [
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
					200: "#14763d",
					300: "#199532",
					400: "#2E442E",
					500: "#1e271f",
				},
				dark: {
					100: "#171f19",
					200: "#121b13",
					300: "#0b110c",
					400: "#080c08",
				},
				light: {
					100: "#ffffff",
					200: "#FBFFFB",
					300: "#eafcf1",
					400: "#F0FBF0",
					500: "#ececec",
					600: "#7f8a7f",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
