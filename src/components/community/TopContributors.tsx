import axios from "axios";
import { useEffect, useState } from "react";
import { Contributor } from "../../types";
import { Avatar } from "../Avatar";

export function TopContributors() {
	const [contributors, setContributors] = useState<Contributor[]>([]);

	useEffect(() => {
		axios("/api/community/contributors/top").then(({ data }) => {
			setContributors(data);
		});
	});

	return (
		<div className="bg-dark-100 rounded-md p-4 grid grid-cols-5 justify-items-center">
			{contributors.map((contributor, i) => (
				<div className="flex space-x-2 items-center">
					<Avatar
						size="48px"
						id={contributor.id}
						link={contributor.avatar}
					/>
					<div className="flex flex-col -space-y-1">
						<div className="flex items-end">
							<div className="font-bold">
								{contributor.name.replace(/[^\x00-\x7F]/g, "")}
							</div>
							<div className="italic text-light-600 text-sm">
								#{contributor.discriminator}
							</div>
						</div>
						<div className="text-sm text-light-600">#{i + 1}</div>
					</div>
				</div>
			))}
		</div>
	);
}
