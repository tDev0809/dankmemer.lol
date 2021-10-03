import Link from "next/link";
import styles from "./index.module.scss";

interface Props {
	text: string;
	link: string;
}

export default function FancyButton({ text, link }: Props) {
	return (
		<Link href={link}>
			<div>
				<a className={styles["button"]} rel="noreferrer noopener">
					{text}
				</a>
				<span className={styles["button-bg"]}></span>
			</div>
		</Link>
	);
}
