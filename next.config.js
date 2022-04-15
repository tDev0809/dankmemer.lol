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
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
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
			{
				source: "/feedback",
				destination: `/community`,
				permanent: true,
			},
			{
				source: "/feedback/p/:path*",
				destination: "/community/post/:path*",
				permanent: true,
			},
			{
				source: "/community/profile/:path*",
				destination: "/@:path*",
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
