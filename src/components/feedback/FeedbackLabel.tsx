import clsx from "clsx";

const types = {
	accepted: "border-[#187530] bg-[#17462a]",
	developer: "border-[#196395] bg-[#173042]",
	implemented: "border-[#958d19] bg-[#404319]",
	duplicate: "border-[#801995] bg-[#391d42]",
	denied: "border-[#951919] bg-[#401d19]",
	invalid: "border-[#951919] bg-[#401d19]",
};

const text = {
	accepted: "Accepted",
	developer: "Developer Response",
	implemented: "Implemented",
	duplicate: "Duplicate",
	denied: "Denied",
	invalid: "Invalid",
};

interface Props {
	type: keyof typeof types;
}

export default function FeedbackLabel({ type }: Props) {
	return (
		<div
			className={clsx(
				types[type],
				"px-2 py-0.5 text-xs rounded-full flex items-center border-2"
			)}
		>
			{text[type]}
		</div>
	);
}
