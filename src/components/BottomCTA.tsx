import FancyButton from "./ui/FancyButton";
import styles from "../assets/styles/components/bottomCTA.module.scss";

export default function BottomCTA() {
	return (
		<div className={styles["bottom-cta"]}>
			<h1 className={styles["bottom-cta-title"]}>Join the family!</h1>
			<p className={styles["bottom-cta-subtitle"]}>
				Add Dank Memer to your Discord server.
			</p>
			<FancyButton
				link="https://invite.dankmemer.lol"
				text="Invite Now"
			/>
		</div>
	);
}
