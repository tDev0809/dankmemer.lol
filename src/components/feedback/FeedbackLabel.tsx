import clsx from "clsx";

const types = {
	accepted:
		"text-[#0A8600] dark:text-[#cef0d0] border-[#187530] bg-[#19954D54]",
	developer:
		"text-[#2B609B] dark:text-[#cedef0] border-[#196395] bg-[#19539554]",
	implemented:
		"text-[#74770E] dark:text-[#eff0ce] border-[#958d19] bg-[#958D1954]",
	duplicate:
		"text-[#841EA4] dark:text-[#e8cef0] border-[#801995] bg-[#80199554]",
	denied: "text-[#A24545] dark:text-[#f0cece] border-[#951919] bg-[#95191954]",
	invalid:
		"text-[#A24545] dark:text-[#f0cece] border-[#951919] bg-[#95191954]",
	considered:
		"text-[#6c39f7] dark:text-[#f0cece] border-[#6c39f7] bg-[#8960f754]",
};

const text = {
	accepted: "Accepted",
	developer: "Developer Response",
	implemented: "Implemented",
	duplicate: "Duplicate",
	denied: "Denied",
	invalid: "Invalid",
	considered: "Considered",
};

interface Props {
	type: keyof typeof types;
}

export default function FeedbackLabel({ type }: Props) {
	return (
		<div
			className={clsx(
				types[type],
				"px-2 py-0.5 text-xs rounded-full flex items-center border-2 w-max"
			)}
		>
			{text[type]}
		</div>
	);
}
