import clsx from "clsx";
import { User } from "../../types";

interface Props {
	user?: User;
}

export function ViewingAs({ user }: Props) {
	if (!user?.moderator) {
		return <div></div>;
	}

	return (
		<div
			className={clsx(
				"flex items-center space-x-2 px-2 py-1 rounded-full text-sm",
				user.developer ? "bg-dank-300" : "bg-blue-400"
			)}
		>
			<span className="material-icons" style={{ fontSize: "16px" }}>
				{user.developer ? "construction" : "local_police"}
			</span>
			<span> Viewing as {user.developer ? "Admin" : "Moderator"}</span>
		</div>
	);
}
