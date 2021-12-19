import clsx from "clsx";
import Tooltip from "./ui/Tooltip";

const colors = {
	developer: "text-dank-300",
	moderator: "text-blue-400",
	botModerator: "text-orange-300",
	honorable: "text-purple-200",
};

const icons = {
	developer: "construction",
	moderator: "local_police",
	botModerator: "smart_toy",
	honorable: "public",
};

const names = {
	developer: "Developer",
	moderator: "Moderator",
	botModerator: "Bot Moderator",
	honorable: "Honorable",
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
