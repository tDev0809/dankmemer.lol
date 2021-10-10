import Link from "next/link";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

const variants = {
	big: "px-3 py-2",
	wide: "w-48 py-2",
};

interface Props {
	children: ReactNode;
	content: ReactNode;
	variant: keyof typeof variants;
}

export default function Dropdown({ children, content, variant }: Props) {
	const [open, setOpen] = useState(false);
	const dropdown = useRef<any>(null);

	useEffect(() => {
		function outside(event: Event) {
			if (!dropdown.current!.contains(event.target)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", outside);

		return () => {
			document.removeEventListener("mousedown", outside);
		};
	}, [dropdown]);

	useEffect(() => {
		window.addEventListener("resize", () => setOpen(false));
	}, []);

	return (
		<div className="select-none cursor-pointer relative" ref={dropdown}>
			<div
				className={clsx(
					"bg-dark-400 flex items-center rounded-md",
					variants[variant]
				)}
				onClick={() => setOpen(!open)}
			>
				{content}
			</div>
			<div className="absolute w-full z-50">
				<div
					className={clsx(open ? "" : "hidden")}
					onClick={() => setOpen(false)}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
