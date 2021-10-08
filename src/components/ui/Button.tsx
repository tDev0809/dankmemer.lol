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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	size?: keyof typeof sizeClasses;
	align?: keyof typeof alignClasses;
	block?: boolean;
	href?: string;
}

export default function Button({
	children,
	className = "",
	size = "medium",
	block = false,
	align = "center",
	color = "gray",
	href,
	disabled = false,
	...props
}: ButtonProps) {
	const content = (
		<button
			className={clsx(
				"inline-flex items-center focus:outline-none font-medium",
				sizeClasses[size],
				alignClasses[align],
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
