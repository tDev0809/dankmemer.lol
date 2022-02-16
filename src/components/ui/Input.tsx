import clsx from "clsx";
import { ChangeEvent, HTMLInputTypeAttribute, KeyboardEvent } from "react";

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
	type?: HTMLInputTypeAttribute;
	resizable?: boolean;
	block?: boolean;
	scrollable?: boolean;
	label?: string;
	required?: boolean;
}

export default function Input({
	onChange,
	onKeyDown,
	value,
	placeholder = "",
	resizable,
	type,
	block,
	label,
	variant,
	scrollable,
	required,
	...options
}: Props) {
	const Text = variant == "short" ? "input" : "textarea";

	const inp = (
		<Text
			onChange={onChange}
			className={clsx(
				"bg-light-200 dark:bg-dank-600",
				"text-black dark:text-light-300",
				"placeholder-neutral-500",
				"p-3 outline-none text-sm rounded-md min-h-[100px]",
				scrollable ? "overflow-auto" : "overflow-hidden",
				!resizable && "resize-none min-h-0",
				block && "w-full",
				variantClasses[variant]
			)}
			placeholder={placeholder}
			value={value}
			onKeyDown={onKeyDown}
			type={type}
			{...options}
		/>
	);

	return label ? (
		<div className="flex flex-col space-y-1 w-full">
			<div className="text-sm text-black dark:text-white">
				{label}
				{required && <sup className="text-red-500">*</sup>}
			</div>
			{inp}
		</div>
	) : (
		inp
	);
}
