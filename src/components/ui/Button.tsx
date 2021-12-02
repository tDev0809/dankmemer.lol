import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

const sizeClasses = {
	small: "px-3 py-1 rounded-md text-sm",
	medium: "px-5 py-2 rounded-md text-sm",
	large: "px-5 py-3 rounded-md",
};

const alignClasses = {
	left: "justify-start",
	center: "justify-center",
	right: "justify-end",
};

const variantClasses = {
	primary: "text-white bg-dank-300 hover:bg-dank-200 transition-colors",
	dark: "text-gray-900 dark:text-white bg-gray-300 hover:bg-gray-400 dark:bg-dank-400 dark:hover:bg-dank-500 transition-colors",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	size?: keyof typeof sizeClasses;
	align?: keyof typeof alignClasses;
	variant?: keyof typeof variantClasses;
	block?: boolean;
	href?: string;
}

export default function Button({
	children,
	className = "",
	size = "medium",
	block = false,
	align = "center",
	variant = "primary",
	href,
	disabled = false,
	...props
}: ButtonProps) {
	const content = (
		<button
			disabled={disabled}
			className={clsx(
				"inline-flex items-center focus:outline-none font-medium",
				sizeClasses[size],
				alignClasses[align],
				variantClasses[variant],
				block && "w-full",
				className,
				disabled ? "cursor-not-allowed" : "cursor-pointer"
			)}
			{...props}
		>
			{children}
		</button>
	);

	if (href) {
		return <Link href={href}>{content}</Link>;
	}

	return content;
}
