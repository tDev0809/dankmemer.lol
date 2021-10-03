import { useEffect, useState } from "react";
import Container from "../ui/Container";
import FancyButton from "../ui/FancyButton";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCog,
	faDollarSign,
	faSmileWink,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";

interface TrianagleProps {
	scale: number;
	translate: [number, number];
	rotate: number;
}

function Trianagle({ scale, translate, rotate }: TrianagleProps) {
	return (
		<g
			transform={`scale(${scale}) translate(${translate.join(
				","
			)}) rotate(${rotate})`}
		>
			<polygon
				fill="#0b110c"
				stroke="#14763d"
				strokeWidth="1.5px"
				className={styles["hero-svg-triangle"]}
				points="62.5,15 12.5,100 112.5,100"
			/>
		</g>
	);
}

export function HomePage() {
	const [perspective, setPerspective] = useState<[number, number]>([0, 0]);
	const [mobile, setMobile] = useState(false);

	const handleResize = () => {
		setMobile(document.documentElement.clientWidth < 900);
	};

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", () => {
			handleResize();
		});
	}, []);

	return (
		<Container title="Home">
			<div className={styles["home"]}>
				<div
					className={styles["hero"]}
					onMouseMove={(e) => setPerspective([e.pageX, e.pageY])}
				>
					<div className={styles["hero-text"]}>
						<h1 className={styles["hero-text-title"]}>
							Dank Memer
						</h1>
						<p className={styles["hero-text-slogan"]}>
							Join millions of users around the world in Discord's
							largest fun economic bot.
						</p>
					</div>
					<div className={styles["hero-cta"]}>
						<FancyButton
							text={"INVITE NOW"}
							link="https://invite.dankmemer.lol"
						/>
					</div>

					<div
						className={styles["hero-svg"]}
						style={{
							transform: `translate(${
								(perspective[0] * -1) / 100
							}px, ${(perspective[1] * -1) / 100}px)`,
						}}
					>
						<svg height="500" width="1100">
							<Trianagle
								scale={1.4}
								translate={[150, 150]}
								rotate={180}
							/>
							<Trianagle
								scale={0.7}
								translate={[340, 400]}
								rotate={140}
							/>
							<Trianagle
								scale={0.6}
								translate={[1200, 30]}
								rotate={85}
							/>
							<Trianagle
								scale={1}
								translate={[900, 200]}
								rotate={20}
							/>
						</svg>
					</div>
					{/* TODO */}
					{/* <div id="nitropay-home-top" className="nitropay" /> */}
				</div>
				<div className={styles["quickinfo"]}>
					<div className={styles["quickinfo-details"]}>
						<h2 className={styles["quickinfo-details-title"]}>
							What is it all about?
						</h2>
						<p className={styles["quickinfo-details-about"]}>
							Here are a just a few of the things that makes Dank
							Memer great.
						</p>
					</div>
					{!mobile ? (
						<div className={styles["quickinfo-content"]}>
							<div className={styles["quickinfo-content-col-2"]}>
								<div
									className={
										styles["quickinfo-content-col-2-group"]
									}
								>
									<div
										className={
											styles[
												"quickinfo-content-col-2-group-icon"
											]
										}
									>
										<FontAwesomeIcon icon={faDollarSign} />
									</div>
									<div>
										<h4>Money, Money, Money</h4>
										<p>
											Experience one of the most unique
											economies found in any Discord bot.
										</p>
									</div>
								</div>
								<div
									className={
										styles["quickinfo-content-col-2-group"]
									}
								>
									<div
										className={
											styles[
												"quickinfo-content-col-2-group-icon"
											]
										}
									>
										<FontAwesomeIcon icon={faSmileWink} />
									</div>
									<div>
										<h4>Even Some Funny Jokes</h4>
										<p>
											100+ meme-related commands, you can
											have a good laugh without the need
											of scrolling through Reddit.
										</p>
									</div>
								</div>
							</div>
							<div className={styles["quickinfo-content-col-2"]}>
								<div
									className={
										styles["quickinfo-content-col-2-group"]
									}
								>
									<div
										className={
											styles[
												"quickinfo-content-col-2-group-icon"
											]
										}
									>
										<FontAwesomeIcon icon={faUsers} />
									</div>
									<div>
										<h4>More Than I Can Count</h4>
										<p>
											Even if you don't have friends,
											there are millions of other users
											waiting to rob you!
										</p>
									</div>
								</div>
								<div
									className={
										styles["quickinfo-content-col-2-group"]
									}
								>
									<div
										className={
											styles[
												"quickinfo-content-col-2-group-icon"
											]
										}
									>
										<FontAwesomeIcon icon={faCog} />
									</div>
									<div>
										<h4>Just Right, For You</h4>
										<p>
											You are able to change specific
											elements of the bot off or on,
											personally or for your server.
										</p>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className={styles["info-cards"]}>
							<div className={styles["info-cards-card"]}>
								<div className={styles["info-cards-card-icon"]}>
									<FontAwesomeIcon icon={faDollarSign} />
								</div>
								<div
									className={
										styles["info-cards-card-content"]
									}
								>
									<h4>Money, Money, Money</h4>
									<p>
										Experience one of the most unique
										economies found in any Discord bot.
									</p>
								</div>
							</div>
							<div className={styles["info-cards-card"]}>
								<div className={styles["info-cards-card-icon"]}>
									<FontAwesomeIcon icon={faSmileWink} />
								</div>
								<div
									className={
										styles["info-cards-card-content"]
									}
								>
									<h4>Even Some Funny Jokes</h4>
									<p>
										100+ meme-related commands, you can have
										a good laugh without the need of
										scrolling through Reddit.
									</p>
								</div>
							</div>
							<div className={styles["info-cards-card"]}>
								<div className={styles["info-cards-card-icon"]}>
									<FontAwesomeIcon icon={faUsers} />
								</div>
								<div
									className={
										styles["info-cards-card-content"]
									}
								>
									<h4>More Than I Can Count</h4>
									<p>
										Even if you don't have friends, there
										are millions of other users waiting to
										rob you!
									</p>
								</div>
							</div>
							<div className={styles["info-cards-card"]}>
								<div className={styles["info-cards-card-icon"]}>
									<FontAwesomeIcon icon={faCog} />
								</div>
								<div
									className={
										styles["info-cards-card-content"]
									}
								>
									<h4>Just Right, For You</h4>
									<p>
										You are able to change specific elements
										of the bot off or on, personally or for
										your server.
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
}
