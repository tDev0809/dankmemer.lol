import clsx from "clsx";
import { ReactNode, useState } from "react";

const margins = {
	small: "-top-9",
	medium: "-top-10",
	big: "-top-11",
};

interface Props {
	content: ReactNode;
	children: ReactNode;
	delay?: number;
	margin?: keyof typeof margins;
}

export default function Tooltip({
	content,
	children,
	delay = 350,
	margin = "small",
}: Props) {
	const [active, setActive] = useState(false);
	let timeout: NodeJS.Timeout;

	const show = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay);
	};

	const hide = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div
			className="inline-block relative"
			onMouseEnter={show}
			onMouseLeave={hide}
		>
			{children}
			<div
				className={clsx(
					"absolute left-1/2 -translate-x-1/2 z-[100] whitespace-nowrap leading-none",
					"p-2 bg-black rounded-md text-sm text-white",
					margins[margin],
					"transition-opacity duration-200 ease-in-out",
					active ? "opacity-100" : "opacity-0"
				)}
			>
				{content}
				<svg
					className="absolute text-black h-3 w-full left-0 top-full"
					x="0px"
					y="0px"
					viewBox="0 0 255 255"
					xmlSpace="preserve"
				>
					<polygon
						className="fill-current"
						points="0, 0 127.5, 127.5 255, 0"
					/>
				</svg>
			</div>
		</div>
	);
}
