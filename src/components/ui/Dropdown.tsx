import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";

const optionVariants = {
	normal: "text-neutral-300",
	danger: "text-rose-600",
};

interface Option {
	label: string;
	link?: string;
	variant?: keyof typeof optionVariants;
	onClick?: (e: any) => void;
}

interface Props {
	content: ReactNode;
	options: Array<Option | null>;
}

export default function Dropdown({ content, options }: Props) {
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
		function handleResize() {
			setOpen(false);
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="select-none cursor-pointer relative" ref={dropdown}>
			<div
				className={clsx(
					"bg-light-500 dark:bg-dank-500 flex items-center rounded-md"
				)}
				onClick={() => setOpen(!open)}
			>
				{content}
			</div>
			<div className="absolute w-full min-h-full z-50 mt-2">
				<div
					className={clsx(
						"bg-[#18191c] flex flex-col rounded-md space-y-1 p-2",
						open ? "" : "hidden"
					)}
					onClick={() => setOpen(false)}
				>
					{options
						.filter((o) => o)
						.map((option) => (
							<Link href={option?.link || "#"}>
								<div
									onClick={(e) =>
										option?.onClick
											? option?.onClick(e)
											: null
									}
									className={clsx(
										"text-sm hover:bg-[#131417] rounded-sm px-2 py-1",
										optionVariants[
											option?.variant || "normal"
										]
									)}
								>
									{option?.label}
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}
