import { NextSeo } from "next-seo";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { User } from "../../types";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Announcement } from "../../types";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Props {
	children: ReactNode;
	title?: string;
	user?: User;
}

export default function Container({ children, title, user }: Props) {
	const [announcement, setAnnounement] = useState<Announcement>();
	const [announcementHidden, setAnnouncementHidden] = useState(false);

	useEffect(() => {
		axios(`/api/announcement/get`).then((data) => {
			if (data.data.content) {
				setAnnounement(data.data);
				if (
					localStorage.getItem("announcement-hide") ==
					data.data.createdAt.toString()
				) {
					setAnnouncementHidden(true);
				}
			}
		});
	}, []);

	const hide = () => {
		localStorage.setItem(
			"announcement-hide",
			announcement!.createdAt.toString()
		);
		setAnnouncementHidden(true);
	};

	return (
		<>
			{title && <NextSeo title={`Dank Memer | ${title}`} />}
			<ToastContainer />
			{announcement && !announcementHidden && (
				<div className="w-full text-center bg-dank-300 relative">
					<p
						dangerouslySetInnerHTML={{
							__html: announcement.content,
						}}
					/>
					<div
						className="absolute right-0 top-0 text-dank-200 cursor-pointer"
						onClick={() => hide()}
					>
						<span className="material-icons">close</span>
					</div>
				</div>
			)}
			<div className="flex flex-col h-screen justify-between">
				<Navbar user={user} />
				<div className="flex justify-center">
					<div className="max-w-7xl mx-8 relative w-full">
						{children}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
