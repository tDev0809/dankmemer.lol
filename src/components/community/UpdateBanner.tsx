import clsx from "clsx";
import { useRouter } from "next/router";
import Button from "../ui/Button";

interface Props {
	title: string;
	description: string;
	image: string;
	url: string;
	buttonText: string;
}

export default function UpdateBanner({
	title,
	description,
	image,
	url,
	buttonText,
}: Props) {
	const router = useRouter();

	return (
		<>
			<svg
				className="imageBlur"
				style={{
					height: "1px",
					width: "1px",
					margin: "-1px",
					position: "absolute",
					zIndex: -1,
				}}
			>
				<filter id="sharpBlur">
					<feGaussianBlur stdDeviation="2"></feGaussianBlur>
					<feColorMatrix
						type="matrix"
						values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
					></feColorMatrix>
					<feComposite
						in2="SourceGraphic"
						operator="in"
					></feComposite>
				</filter>
			</svg>

			<div className="relative flex flex-col justify-center h-auto py-4 md:py-0 md:h-52 rounded-lg px-10 md:px-24 bg-opacity-50 text-center md:text-left">
				<div
					className={clsx(
						"absolute left-0 top-0 z-[-1] w-full min-h-full rounded-lg bg-blend-multiply bg-cover bg-center bg-no-repeat",
						(!image || image.length == 0) &&
							"bg-light-500 dark:bg-dark-100"
					)}
					style={{
						backgroundImage: `url("${image}")`,
						filter: "url(#sharpBlur)",
					}}
				></div>
				<h1 className="font-bold font-montserrat text-3xl text-light-100">
					{title}
				</h1>
				<p className="text-light-300 mb-3 drop-shadow">{description}</p>
				<div>
					<Button variant="primary" onClick={() => router.push(url)}>
						<div className="flex items-center space-x-2">
							<p>{buttonText}</p>
						</div>
					</Button>
				</div>
			</div>
		</>
	);
}
