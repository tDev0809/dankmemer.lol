import Link from "next/link";
import clsx from "clsx";

interface Props {
	text: string;
	link: string;
}

export default function FancyButton({ text, link }: Props) {
	return (
		<Link href={link}>
			<div className="relative group">
				<a
					className={clsx(
						"cursor-pointer relative block z-10 text-2xl px-6 py-2",
						"border-[3px] border-lightgreen bg-darkgreen text-white"
					)}
					rel="noreferrer noopener"
				>
					{text}
				</a>
				<div
					className={clsx(
						"absolute top-[7px] left-[7px] h-full w-full",
						"border-[3px] border-lightgreen",
						"group-hover:top-0 group-hover:left-0",
						"transition-all duration-200 ease-in-out"
					)}
				></div>
			</div>
		</Link>
	);
}
