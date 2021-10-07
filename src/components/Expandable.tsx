import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
	name: string;
	description?: string;
	fields: Record<string, string>;
	setExpandedIds?: Dispatch<SetStateAction<string[]>>;
	expandedIds?: string[];
}

export default function Expandable({
	name,
	description,
	fields,
	setExpandedIds,
	expandedIds,
}: Props) {
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		if (setExpandedIds) {
			if (expanded) {
				setExpandedIds([...expandedIds!, name]);
			} else {
				setExpandedIds([...expandedIds!.filter((id) => id !== name)]);
			}
		}
	}, [expanded]);

	useEffect(() => {
		if (!expandedIds?.includes(name)) {
			setExpanded(false);
		}
	}, [expandedIds]);

	return (
		<div
			className={clsx(
				"bg-dank-400 rounded-md p-4 border select-none",
				expanded ? "border-dank-100" : "border-dank-400"
			)}
			onClick={() => setExpanded(!expanded)}
		>
			<div>
				<div className="text-lg">{name}</div>
				{description && (
					<div className="text-gray-400 text-sm">{description}</div>
				)}
				<div
					className={clsx(
						"border-t-2 border-dank-250 mt-2 pt-2 flex flex-col space-y-3",
						expanded ? "visible opacity-100" : "hidden opacity-0"
					)}
				>
					{Object.entries(fields).map(([title, content]) => (
						<div>
							<div className="text-sm">{title}</div>
							<div className="text-sm text-gray-400">
								{content}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
