import clsx from "clsx";
import { User } from "../../types";

interface Props {
	user?: User;
}

export function ViewingAs({ user }: Props) {
	if (!user?.isModerator) {
		return <div></div>;
	}

	return (
		<div
			className={clsx(
				"flex items-center space-x-2 px-2 py-1 rounded-md",
				user.isAdmin ? "bg-dank-300" : "bg-blue-400"
			)}
		>
			<span className="material-icons">
				{user.isAdmin ? "construction" : "local_police"}
			</span>
			<span> Viewing as {user.isAdmin ? "Admin" : "Moderator"}</span>
		</div>
	);
}
