import { useEffect, useState } from "react";
import BottomCTA from "../components/BottomCTA";
import Container from "../components/ui/Container";
import FancyButton from "../components/ui/FancyButton";
import { QUICK_INFO } from "../constants";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { withSession } from "../util/session";
import { unauthenticatedRoute } from "../util/redirects";
import { PageProps } from "../types";
import { useRouter } from "next/router";

interface TriangleProps {
	scale: number;
	translate: [number, number];
	rotate: number;
}

function Triangle({ scale, translate, rotate }: TriangleProps) {
	return (
		<g
			transform={`scale(${scale}) translate(${translate.join(
				","
			)}) rotate(${rotate})`}
		>
			<polygon
				stroke="#14763d"
				strokeWidth="1.5px"
				style={{ filter: "drop-shadow(0px 0px 18px #14763d)" }}
				points="62.5,15 12.5,100 112.5,100"
				className="fill-current text-light-600 dark:text-dark-700"
			/>
		</g>
	);
}

export default function HomePage({ user }: PageProps) {
	const router = useRouter();

	const [perspective, setPerspective] = useState<[number, number]>([0, 0]);
	const [mobile, setMobile] = useState(false);

	const handleResize = () => {
		setMobile(document.documentElement.clientWidth < 900);
	};

	useEffect(() => {
		if (router.query.r) {
			location.replace("/");
		}

		handleResize();

		window.addEventListener("resize", () => {
			handleResize();
		});
	}, []);

	return (
		<Container title="Home" user={user}>
			<div
				className="flex flex-col justify-center items-center mt-32 lg:mt-72"
				onMouseMove={(e) => setPerspective([e.pageX, e.pageY])}
			>
				<div className="flex flex-col items-center space-y-8">
					<div className="flex flex-col items-center max-w-3xl">
						<h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-dank-200 dark:text-white">
							DANK MEMER
						</h1>
						<p className="text-lg md:text-2xl max-w-lg md:max-w-xl text-center text-light-100 dark:text-gray-400">
							Join millions of users around the world in Discord's
							largest fun economic bot.
						</p>
					</div>
					<FancyButton
						text={"INVITE NOW"}
						link="https://invite.dankmemer.lol"
					/>
				</div>
				<div
					className="absolute hidden lg:block z-0"
					style={{
						transform: `translate(${
							(perspective[0] * -1) / 100
						}px, ${(perspective[1] * -1) / 100}px)`,
					}}
				>
					<svg height="500" width="1100">
						<Triangle
							scale={1.4}
							translate={[150, 150]}
							rotate={180}
						/>
						<Triangle
							scale={0.7}
							translate={[340, 400]}
							rotate={140}
						/>
						<Triangle
							scale={0.6}
							translate={[1200, 30]}
							rotate={85}
						/>
						<Triangle
							scale={1}
							translate={[900, 200]}
							rotate={20}
						/>
					</svg>
				</div>
				{/* TODO */}
				{/* <div id="nitropay-home-top" className="nitropay" /> */}
			</div>
			<div className="flex flex-col items-center mt-80 space-y-4 font-inter">
				<div className="text-center">
					<div className="text-3xl font-bold text-dank-200 dark:text-white font-montserrat">
						What is it all about?
					</div>
					<div className="text-light-100 dark:text-dark-100">
						Here are a just a few of the things that makes Dank
						Memer great.
					</div>
				</div>
				<div
					className={clsx(
						"grid grid-cols-1 lg:grid-cols-2 gap-8",
						"max-w-sm lg:max-w-3xl md:rounded-lg p-8",
						"bg-light-500 lg:bg-light-500 dark:bg-dark-700 lg:dark:bg-dark-800",
						"text-dark-500 dark:text-dark-100"
					)}
				>
					{QUICK_INFO.map((info) => (
						<div
							className="flex items-center align-middle rounded-lg"
							key={info.icon}
						>
							<div
								className={clsx(
									"flex flex-col lg:flex-row items-center",
									"space-x-0 space-y-4 lg:space-x-8 lg:space-y-0 p-8 lg:p-0"
								)}
							>
								<div className="grid place-items-center min-w-[45px] min-h-[45px] rounded-full w-10 h-10 bg-gray-50 dark:bg-dark-700">
									<span className="material-icons text-dank-200">
										{info.icon}
									</span>
								</div>
								<div className="flex flex-col text-center lg:text-left">
									<h4 className="font-bold font-montserrat">
										{info.title}
									</h4>
									<p className="text-md lg:text-sm">
										{info.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="m-24">
				<BottomCTA />
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
