import { randomAvatar } from "../util/random";

interface Props {
	link: string;
	id: string;
	size: string;
}

export function Avatar({ link, id, size }: Props) {
	return (
		<img
			src={link}
			width={size}
			className="bg-light-600 rounded-full"
			onError={(e) => {
				(e.target as any).onerror = null;
				(e.target as any).src = randomAvatar(id);
			}}
		/>
	);
}
