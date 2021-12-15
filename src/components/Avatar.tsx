import clsx from "clsx";
import { randomAvatar } from "../util/random";

interface Props {
	link: string;
	id: string;
	size: string;
	className?: string;
}

export function Avatar({ link, id, size, className = "" }: Props) {
	return (
		<img
			src={link}
			width={size}
			className={clsx("bg-light-600 rounded-full", className)}
			onError={(e) => {
				(e.target as any).onerror = null;
				(e.target as any).src = randomAvatar(id);
			}}
		/>
	);
}
