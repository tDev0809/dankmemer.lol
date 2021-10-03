import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import Navbar from "../sections/Navbar";

interface Props {
	children: ReactNode;
	title?: string;
}

export default function Container({ children, title }: Props) {
	return (
		<>
			{title && <NextSeo title={`Dank Memer | ${title}`} />}
			<Navbar />
			<div>{children}</div>
		</>
	);
}
