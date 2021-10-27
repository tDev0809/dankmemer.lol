const path = require("path");

module.exports = {
	async redirects() {
		return [];
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
