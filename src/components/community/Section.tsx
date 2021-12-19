import { ReactNode } from "react";
import { Title } from "../Title";

interface Props {
	title: string;
	children?: ReactNode;
	button?: ReactNode;
}

export default function Section({ title, children, button }: Props) {
	return (
		<section className="flex flex-col space-y-2">
			<div className="flex justify-between item-center">
				<Title size="medium">{title}</Title>
				{button}
			</div>
			{children}
		</section>
	);
}
