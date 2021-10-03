import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCog,
	faDollarSign,
	faSmileWink,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Quickinfo.module.scss";

interface Props {
	mobile: boolean;
}

export default function Quickinfo({ mobile }: Props) {
	return (
		<div className={styles["quickinfo"]}>
			<div className={styles["quickinfo-details"]}>
				<h2 className={styles["quickinfo-details-title"]}>
					What is it all about?
				</h2>
				<p className={styles["quickinfo-details-about"]}>
					Here are a just a few of the things that makes Dank Memer
					great.
				</p>
			</div>
			{!mobile ? (
				<div className={styles["quickinfo-content"]}>
					<div className={styles["quickinfo-content-col-2"]}>
						<div
							className={styles["quickinfo-content-col-2-group"]}
						>
							<div
								className={
									styles["quickinfo-content-col-2-group-icon"]
								}
							>
								<FontAwesomeIcon icon={faDollarSign} />
							</div>
							<div>
								<h4>Money, Money, Money</h4>
								<p>
									Experience one of the most unique economies
									found in any Discord bot.
								</p>
							</div>
						</div>
						<div
							className={styles["quickinfo-content-col-2-group"]}
						>
							<div
								className={
									styles["quickinfo-content-col-2-group-icon"]
								}
							>
								<FontAwesomeIcon icon={faSmileWink} />
							</div>
							<div>
								<h4>Even Some Funny Jokes</h4>
								<p>
									100+ meme-related commands, you can have a
									good laugh without the need of scrolling
									through Reddit.
								</p>
							</div>
						</div>
					</div>
					<div className={styles["quickinfo-content-col-2"]}>
						<div
							className={styles["quickinfo-content-col-2-group"]}
						>
							<div
								className={
									styles["quickinfo-content-col-2-group-icon"]
								}
							>
								<FontAwesomeIcon icon={faUsers} />
							</div>
							<div>
								<h4>More Than I Can Count</h4>
								<p>
									Even if you don't have friends, there are
									millions of other users waiting to rob you!
								</p>
							</div>
						</div>
						<div
							className={styles["quickinfo-content-col-2-group"]}
						>
							<div
								className={
									styles["quickinfo-content-col-2-group-icon"]
								}
							>
								<FontAwesomeIcon icon={faCog} />
							</div>
							<div>
								<h4>Just Right, For You</h4>
								<p>
									You are able to change specific elements of
									the bot off or on, personally or for your
									server.
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
						<div className={styles["info-cards-card-content"]}>
							<h4>Money, Money, Money</h4>
							<p>
								Experience one of the most unique economies
								found in any Discord bot.
							</p>
						</div>
					</div>
					<div className={styles["info-cards-card"]}>
						<div className={styles["info-cards-card-icon"]}>
							<FontAwesomeIcon icon={faSmileWink} />
						</div>
						<div className={styles["info-cards-card-content"]}>
							<h4>Even Some Funny Jokes</h4>
							<p>
								100+ meme-related commands, you can have a good
								laugh without the need of scrolling through
								Reddit.
							</p>
						</div>
					</div>
					<div className={styles["info-cards-card"]}>
						<div className={styles["info-cards-card-icon"]}>
							<FontAwesomeIcon icon={faUsers} />
						</div>
						<div className={styles["info-cards-card-content"]}>
							<h4>More Than I Can Count</h4>
							<p>
								Even if you don't have friends, there are
								millions of other users waiting to rob you!
							</p>
						</div>
					</div>
					<div className={styles["info-cards-card"]}>
						<div className={styles["info-cards-card-icon"]}>
							<FontAwesomeIcon icon={faCog} />
						</div>
						<div className={styles["info-cards-card-content"]}>
							<h4>Just Right, For You</h4>
							<p>
								You are able to change specific elements of the
								bot off or on, personally or for your server.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
