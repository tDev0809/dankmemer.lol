import Tooltip from "./ui/Tooltip";

export function DeveloperBadge() {
	return (
		<Tooltip content="Developer">
			<div className="material-icons cursor-default text-dank-300">
				construction
			</div>
		</Tooltip>
	);
}

export function ModeratorBadge() {
	return (
		<Tooltip content="Moderator">
			<div className="material-icons cursor-default text-blue-400">
				local_police
			</div>
		</Tooltip>
	);
}
