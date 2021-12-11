import { useRouter } from "next/router";
import Button from "../ui/Button";

interface Props {
	title: string;
	description: string;
	image: string;
	id: string;
}

export default function UpdateBanner({ title, description, image, id }: Props) {
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
					className="absolute left-0 top-0 z-[-1] w-full min-h-full rounded-lg bg-blend-multiply bg-cover bg-center bg-no-repeat"
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
					<Button
						variant="primary"
						onClick={() => router.push(`/community/updates/${id}`)}
					>
						<div className="flex items-center space-x-2">
							<p>View the Changelog</p>
						</div>
					</Button>
				</div>
			</div>
		</>
	);
}
