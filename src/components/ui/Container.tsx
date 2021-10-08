import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { User } from "../../types";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "react-toastify/dist/ReactToastify.css";

interface Props {
	children: ReactNode;
	title?: string;
	user?: User;
}

export default function Container({ children, title, user }: Props) {
	return (
		<>
			{title && <NextSeo title={`Dank Memer | ${title}`} />}
			<ToastContainer />
			<Navbar user={user} />
			<div>{children}</div>
			<Footer />
		</>
	);
}
