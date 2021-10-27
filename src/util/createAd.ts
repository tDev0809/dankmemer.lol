export default function createAd(
	id: string,
	opts: any, // TODO: (Badosz) type
	device: "desktop" | "mobile"
) {
	if (device === "desktop") {
		opts.mediaQuery = "(min-width: 1025px)";
	} else if (device === "mobile") {
		opts.mediaQuery =
			"(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)";
	}

	// TODO: (Badosz) type
	(window as any).nitroAds &&
		(window as any).nitroAds.createAd(id, {
			demo: process.env.NODE_ENV === "development",
			refreshLimit: 10,
			refreshTime: 30,
			renderVisibleOnly: false,
			refreshVisibleOnly: true,
			report: {
				enabled: true,
				wording: "Report Ad",
				position: "top-right",
			},
			...opts,
		});
}
