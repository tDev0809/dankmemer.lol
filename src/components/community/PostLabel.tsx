interface Props {
	label: string;
}

// TODO: all labels
const colors: Record<string, string> = {
	accepted: "#64b83d",
	"developer-response": "#6891d9",
};

export function Label({ label }: Props) {
	return (
		<div className="flex items-center space-x-2 bg-dark-300 px-2 py-1 rounded-md text-xs">
			<div
				className="h-3 w-3 rounded-full"
				style={{ backgroundColor: colors[label] ?? "#a4adbd" }}
			></div>
			<div>{label.replaceAll("-", " ")}</div>
		</div>
	);
}
