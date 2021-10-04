import styles from "../assets/styles/components/Footer.module.scss";
import Link from "next/link";

interface Props {}

export default function Footer({}: Props) {
	return (
		<footer>
			<div className={styles["container"]}>
				<div className={styles["branding"]}>
					<Link href="/">
						<img
							className={styles["logo"]}
							src={"/img/memer.png"}
							alt="Logo"
							width="100"
						/>
					</Link>
					<div className={styles["branding-text"]}>
						<h2 className={styles["branding-text-title"]}>
							Dank Memer
						</h2>
						<span className={styles["branding-text-copyright"]}>
							Copyright © {new Date().getFullYear()} Dank Memer
						</span>
						<span data-ccpa-link="1"></span>
					</div>
				</div>
				<div className={styles["links"]}>
					<div className={styles["links-col"]}>
						<a
							className={styles["link"]}
							href="https://www.patreon.com/join/dankmemerbot"
						>
							Premium
						</a>
						<Link href="/commands">
							<span className={styles["link"]}>Commands</span>
						</Link>
						<Link href="/blogs">
							<span className={styles["link"]}>Our blog</span>
						</Link>
					</div>
					<div className={styles["links-col"]}>
						<Link href="/staff">
							<span className={styles["link"]}>Staff</span>
						</Link>
						<Link href="/terms">
							<span className={styles["link"]}>Terms</span>
						</Link>
						<Link href="/privacy">
							<span className={styles["link"]}>Privacy</span>
						</Link>
					</div>
					<div className={styles["links-col"]}>
						<Link href="/rules">
							<span className={styles["link"]}>Rules</span>
						</Link>
						<Link href="/reports">
							<span className={styles["link"]}>Reports</span>
						</Link>
						<Link href="/appeals">
							<span className={styles["link"]}>Appeals</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
