import { ReactNode } from "react";

const time = {
	day: 1000 * 60 * 60 * 24,
	week: 1000 * 60 * 60 * 24 * 7,
	month: 1000 * 60 * 60 * 24 * 30,
	year: 1000 * 60 * 60 * 24 * 365,
};

interface Props {
	added: Date;
	expireIn?: keyof typeof time;
	children: ReactNode;
}

export function Expire({ added, children, expireIn = "month" }: Props) {
	return (
		<div>
			{Date.now() < time[expireIn] + added.getTime() ? children : null}
		</div>
	);
}
