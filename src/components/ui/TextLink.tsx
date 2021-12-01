import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	href: string;
	children: ReactNode;
	blank?: boolean;
}

export default function TextLink({ href, children, blank = false }: Props) {
	return (
		<Link href={href}>
			<a
				target={blank ? "_blank" : "_self"}
				className={"text-dank-300 hover:underline"}
			>
				{children}
			</a>
		</Link>
	);
}
