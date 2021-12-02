import { useEffect } from "react";
import createAd from "../util/createAd";

interface Props {
	id: string;
	platform: "mobile" | "desktop";
	sizes: [number, number][];
}

export function Ad({ id, platform, sizes }: Props) {
	useEffect(() => {
		createAd(
			id,
			{
				sizes,
				renderVisibleOnly: true,
			},
			platform
		);
	}, []);

	return <div id={id} />;
}
