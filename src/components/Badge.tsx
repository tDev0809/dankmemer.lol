import clsx from "clsx";
import Tooltip from "./ui/Tooltip";

const colors = {
	developer: "text-dank-300",
	moderator: "text-blue-400",
	botModerator: "text-orange-300",
	honorable: "text-purple-200",
	modManager: "text-rose-400",
};

const icons = {
	developer: "construction",
	moderator: "local_police",
	botModerator: "smart_toy",
	honorable: "public",
	modManager: "next_week",
};

const names = {
	developer: "Developer",
	moderator: "Moderator",
	botModerator: "Bot Moderator",
	honorable: "Honorable",
	modManager: "Mod Manager",
};

interface Props {
	role: keyof typeof colors;
	size?: number;
	tooltip?: boolean;
}

export function Badge({ role, size = 22, tooltip = true }: Props) {
	const badge = (
		<div
			className={clsx("material-icons cursor-default", colors[role])}
			style={{ fontSize: `${size}px` }}
		>
			{icons[role]}
		</div>
	);

	return tooltip ? <Tooltip content={names[role]}>{badge}</Tooltip> : badge;
}
