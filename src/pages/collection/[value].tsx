import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import Container from "../../components/ui/Container";
import { PageProps } from "../../types";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";
import Link from "next/link";

interface PepeCardProps {
	index: number;
	has: boolean;
}

function PepeCard({ index, has }: PepeCardProps) {
	const [cardTransform, setCardTransform] = useState("");
	const [cardFilter, setCardFilter] = useState("");
	const [zIndex, setZIndex] = useState(1);
	const router = useRouter();

	const maxTilt = 30;

	const eventBounding = (e: MouseEvent) => {
		let bounding = (e.target as any).getBoundingClientRect(); // TODO: remove any
		return {
			x: Math.max(0, e.clientX - Math.round(bounding.left)),
			y: Math.max(0, e.clientY - Math.round(bounding.top)),
			width: Math.round(bounding.width),
			height: Math.round(bounding.height),
		};
	};

	const onMouseMove = (e: MouseEvent) => {
		let bounding = eventBounding(e);
		let X = bounding.width / 2 - bounding.x;
		let Y = bounding.height / 2 - bounding.y;
		let hypotenuseCursor = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
		let ratio =
			hypotenuseCursor /
			Math.sqrt(
				Math.pow(bounding.width / 2, 2) +
					Math.pow(bounding.height / 2, 2)
			);

		setCardTransform(
			`rotate3d(${Y / hypotenuseCursor}, ${-X / hypotenuseCursor}, 0, ${
				ratio * maxTilt
			}deg) scale(1.5)`
		);
		setCardFilter(`brightness(${1.6 - bounding.y / bounding.height})`);
		setZIndex(50);
	};

	const onMouseLeave = () => {
		setCardFilter("");
		setCardTransform("");
		setZIndex(1);
	};

	return (
		<div
			className="flex flex-col items-center rounded-md relative origin-center cursor-pointer bg-gray-200 dark:bg-dank-500"
			style={{
				transform: cardTransform,
				filter: cardFilter,
				perspective: "1000px",
				transition: "transform 0.2s, filter 0.35s",
				boxShadow: "0px 0px 8px 1px #000000ad",
				transformStyle: "preserve-3d",
				willChange: "transform",
				zIndex: zIndex,
			}}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			onClick={() =>
				has
					? router.push(
							`https://opensea.io/assets/0xb30823ece82f27e358330b76b33243a4f1f0539e/${index}`
					  )
					: null
			}
		>
			<div>
				<div className="">
					{has ? (
						<img src={`/img/collection/${index}-nobg.png`} />
					) : (
						<>
							<img
								src={`/img/collection/missing-light.png`}
								className="dark:hidden visible"
							/>
							<img
								src={`/img/collection/missing-dark.png`}
								className="hidden dark:inline-block"
							/>
						</>
					)}
				</div>
			</div>
			<div className="flex items-center w-full justify-center rounded-b-md py-2 bg-gray-300 dark:bg-dank-400 ">
				<div className="text-sm px-3 rounded-xl bg-gray-200 dark:bg-dank-500 text-gray-800 dark:text-white">
					#{index}
				</div>
			</div>
		</div>
	);
}

export default function CollectionPage({ user }: PageProps) {
	const router = useRouter();
	let { value } = router.query;

	let collection = new Array(50).fill(false);

	try {
		atob(value as string)
			.split(",")
			.forEach((pepe: string) => {
				const index = parseInt(pepe);
				if (index >= 0 && index <= 49) {
					collection[index] = true;
				}
			});

		if (collection.length !== 50) {
			collection = new Array(50).fill(false);
		}
	} catch (e) {}

	return (
		<Container title="Collection" user={user}>
			<div className="flex justify-center w-full">
				<Link href="https://frog.family/">
					<a className="text-dank-300 underline my-8" target="_blank">
						Adopt your own pepe!
					</a>
				</Link>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-6">
				{collection.map((has, i) => (
					<div key={i}>
						<PepeCard index={i + 1} has={has} />
					</div>
				))}
			</div>
			<div className="flex justify-center w-full">
				<Link href="https://frog.family/">
					<a className="text-dank-300 underline my-8" target="_blank">
						Adopt your own pepe!
					</a>
				</Link>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
