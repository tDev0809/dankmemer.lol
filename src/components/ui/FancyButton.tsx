import Link from "next/link";
import clsx from "clsx";

const variants = {
	big: "text-2xl px-6 py-2",
	small: "text-lg px-6 py-2",
};

interface Props {
	text: string;
	link: string;
	variant?: keyof typeof variants;
}

export default function FancyButton({ text, link, variant = "big" }: Props) {
	return (
		<Link href={link}>
			<div className="relative group block">
				<a
					className={clsx(
						variants[variant],
						"cursor-pointer relative block z-[-1]",
						"border-[3px] border-dank-200 bg-light-200 dark:bg-dark-300 text-black dark:text-white"
					)}
					rel="noreferrer noopener"
				>
					{text}
				</a>
				<div
					className={clsx(
						"absolute top-[7px] left-[7px] h-full w-full z-[-2]",
						"border-[3px] border-dank-200",
						"group-hover:top-0 group-hover:left-0",
						"transition-all duration-200 ease-in-out"
					)}
				></div>
			</div>
		</Link>
	);
}
