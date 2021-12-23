import { toTitleCase } from "src/util/string";

interface Props {
	label: string;
}

const colors: Record<string, string> = {
	accepted: "#64b83d",
	implemented: "#e6c365",
	duplicate: "#e36da6",
	denied: "#eb441a",
	invalid: "#eb441a",
	considered: "#9f50f2",
	"developer-response": "#6891d9",
};

export function Label({ label }: Props) {
	return (
		<div className="flex items-center space-x-2 bg-light-400 dark:bg-dark-300 px-2 py-1 rounded-md text-xs text-black dark:text-white">
			<div
				className="h-3 w-3 rounded-full"
				style={{ backgroundColor: colors[label] ?? "#a4adbd" }}
			></div>
			<div>{toTitleCase(label.replaceAll("-", " "))}</div>
		</div>
	);
}
