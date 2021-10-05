import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { User } from "../../types";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface Props {
	children: ReactNode;
	title?: string;
	user?: User;
}

export default function Container({ children, title, user }: Props) {
	return (
		<>
			{title && <NextSeo title={`Dank Memer | ${title}`} />}
			<Navbar user={user} />
			<div>{children}</div>
			<Footer />
		</>
	);
}
