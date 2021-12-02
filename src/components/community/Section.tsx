import { ReactNode } from "react";
import { Title } from "../Title";

interface Props {
	title: string;
	children?: ReactNode;
}

export default function Section({ title, children }: Props) {
	return (
		<section className="flex flex-col space-y-4">
			<Title size="medium">{title}</Title>
			{children}
		</section>
	);
}
