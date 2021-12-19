const path = require("path");

module.exports = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "Permissions-Policy",
						value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/premium",
				destination: "https://www.patreon.com/join/dankmemerbot",
				permanent: true,
			},
			{
				source: "/blogs/:path*",
				destination: `/community/blog/:path*`,
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/source",
				destination: "/api/source",
			},
		];
	},
};
