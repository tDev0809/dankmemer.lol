import axios from "axios";
import clsx from "clsx";
import { formatDistance } from "date-fns";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { Title } from "../../components/Title";
import Container from "../../components/ui/Container";
import { Notification, PageProps } from "../../types";
import { authenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";
import Link from "next/link";

export default function Notifications({ user }: PageProps) {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [lastNotification, setLastNotification] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios(`/api/community/notifications/get?page=${page}`).then(
			({ data }) => {
				setNotifications(data.notifications);
				if (page == 0) {
					setLastNotification(data.lastNotification);
				}
			}
		);
	}, []);
	return (
		<Container title="Notifications" user={user}>
			<div className="flex flex-col my-16 space-y-4 ">
				<Title size="big">Your Notifications</Title>
				<div className="flex flex-col space-y-4">
					{notifications.map((notification) => (
						<Link href={notification.link}>
							<a className="bg-light-500 dark:bg-dark-100 rounded-md p-4">
								<div className="flex space-x-4 items-center">
									<div className="h-10 w-10 bg-light-400 dark:bg-dank-400 rounded-full flex items-center justify-center text-black dark:text-white">
										<div
											className="material-icons"
											style={{ fontSize: "20px" }}
										>
											{notification.icon}
										</div>
									</div>
									<div className="text-sm flex-1">
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-2">
												<div className="text-black dark:text-white break-all">
													{notification.title}
												</div>
												{notification.createdAt >
													lastNotification && (
													<div className="bg-rose-500 px-1 rounded-md text-xs">
														NEW
													</div>
												)}
											</div>
											<div className="text-light-600 hidden md:inline-block">
												{formatDistance(
													new Date(
														notification.createdAt
													),
													new Date(),
													{
														addSuffix: true,
													}
												)}
											</div>
										</div>
										<div className="text-light-600">
											{notification.content}
										</div>
									</div>
								</div>
							</a>
						</Link>
					))}
					{notifications.length == 0 && (
						<div className="flex flex-col items-center space-y-2 bg-light-500 dark:bg-dark-100 p-4 rounded-md">
							<img
								src="/img/memer.png"
								width={160}
								className="grayscale"
							/>
							<div className="italic">Woah... so empty</div>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(authenticatedRoute);
