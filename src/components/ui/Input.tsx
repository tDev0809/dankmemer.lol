import clsx from "clsx";
import { ChangeEvent } from "react";

const variantClasses = {
	short: "h-10",
	medium: "h-48",
	long: "h-96",
};

interface Props {
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	value: string;
	variant: keyof typeof variantClasses;
	resizable?: boolean;
	block?: boolean;
	scrollable?: boolean;
}

export default function Input({
	onChange,
	value,
	placeholder = "",
	resizable,
	block,
	variant,
	scrollable,
}: Props) {
	const Text = variant == "short" ? "input" : "textarea";

	return (
		<Text
			onChange={onChange}
			className={clsx(
				"bg-light-200 dark:bg-dank-600",
				"text-black dark:text-light-300",
				"placeholder-gray-500",
				"p-3 outline-none text-sm rounded-md",
				scrollable ? "overflow-auto" : "overflow-hidden",
				!resizable && "resize-none",
				block && "w-full",
				variantClasses[variant]
			)}
			placeholder={placeholder}
			value={value}
		/>
	);
}
