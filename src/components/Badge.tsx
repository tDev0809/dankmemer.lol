import clsx from "clsx";
import Tooltip from "./ui/Tooltip";

const colors = {
	developer: "text-dank-300",
	moderator: "text-blue-400",
	botModerator: "text-orange-300",
};

const icons = {
	developer: "construction",
	moderator: "local_police",
	botModerator: "smart_toy",
};

const names = {
	developer: "Developer",
	moderator: "Moderator",
	botModerator: "Bot Moderator",
};

interface Props {
	role: keyof typeof colors;
}

export function Badge({ role }: Props) {
	return (
		<Tooltip content={names[role]}>
			<div
				className={clsx("material-icons cursor-default", colors[role])}
			>
				{icons[role]}
			</div>
		</Tooltip>
	);
}
