import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

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
			<Footer />
		</>
	);
}
