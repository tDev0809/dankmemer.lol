import clsx from "clsx";
import { ChangeEvent, KeyboardEvent } from "react";

const variantClasses = {
	short: "h-10",
	medium: "h-48",
	long: "h-96",
};

interface Props {
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onKeyDown?: (
		e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder?: string;
	value: string;
	variant: keyof typeof variantClasses;
	resizable?: boolean;
	block?: boolean;
	scrollable?: boolean;
	label?: string;
}

export default function Input({
	onChange,
	onKeyDown,
	value,
	placeholder = "",
	resizable,
	block,
	label,
	variant,
	scrollable,
}: Props) {
	const Text = variant == "short" ? "input" : "textarea";

	const inp = (
		<Text
			onChange={onChange}
			className={clsx(
				"bg-light-200 dark:bg-dank-600",
				"text-black dark:text-light-300",
				"placeholder-neutral-500",
				"p-3 outline-none text-sm rounded-md",
				scrollable ? "overflow-auto" : "overflow-hidden",
				!resizable && "resize-none",
				block && "w-full",
				variantClasses[variant]
			)}
			placeholder={placeholder}
			value={value}
			onKeyDown={onKeyDown}
		/>
	);

	return label ? (
		<div className="flex flex-col space-y-1">
			<div className="text-sm text-black dark:text-white">{label}</div>
			{inp}
		</div>
	) : (
		inp
	);
}
