const path = require("path");

module.exports = {
	async redirects() {
		return [
			{
				source: "/premium",
				destination: "https://www.patreon.com/join/dankmemerbot",
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/robots.txt",
				destination: "/api/robots",
			},
		];
	},
};
