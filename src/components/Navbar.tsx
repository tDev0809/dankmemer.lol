import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../types";
import { Avatar } from "./Avatar";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";

interface Props {
	user?: User;
}

export default function Navbar({ user }: Props) {
	const [hamburger, setHamburger] = useState(false);
	const [discount, setDiscount] = useState(0);
	const [mobileAccountExpanded, setMobileAccountExpanded] = useState(false);

	useEffect(() => {
		document.documentElement.style.overflow = hamburger ? "hidden" : "auto";
	}, [hamburger]);

	useEffect(() => {
		function handleResize() {
			setHamburger(false);
		}

		window.addEventListener("resize", handleResize);

		axios(`/api/discount/get`).then(({ data }) => {
			setDiscount((data.percent || 0) * 100);
		});

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<div className="flex justify-center items-center text-lg">
				<nav className="max-w-7xl drop-shadow-xl dark:drop-shadow-none bg-light-200 dark:bg-dark-200 lg:rounded-md flex justify-between p-4 mt-0 lg:mt-5 w-full lg:w-11/12 z-[1]">
					<div className="flex items-center">
						<Link href="/">
							<img
								className="cursor-pointer"
								src={"/img/memer.png"}
								alt="Logo"
								width="42"
							/>
						</Link>
						<ul className="ml-5 space-x-4 hidden lg:flex">
							<li className="inline-block text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100">
								<Link href="/commands">Commands</Link>
							</li>
							<li className="inline-block text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100">
								<Link href="/faq">FAQ</Link>
							</li>
							<li
								className={clsx(
									"inline-block  ",
									discount
										? "text-yellow-300 dark:text-yellow-300 hover:text-yellow-400 dark:hover:text-yellow-400"
										: "text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100"
								)}
							>
								<Link href="/loot">
									<div className="flex items-center space-x-2 cursor-pointer">
										<span>Store</span>
										{!!discount && (
											<span className="text-xs bg-yellow-300 text-dark-400 rounded-md px-2 font-bold font-montserrat">
												SALE: {discount}%
											</span>
										)}
									</div>
								</Link>
							</li>
							<li className="inline-block text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100">
								<Link href="/items">Items</Link>
							</li>
							<li className="inline-block text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100">
								<Link href="/community">Community</Link>
							</li>
							{/* <li className="inline-block text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100">
								<Link href="/feedback">Feedback</Link>
							</li> */}
						</ul>
						<div className="ml-4 text-xl font-montserrat font-bold inline-block lg:hidden text-gray-800 dark:text-light-200">
							Dank Memer
						</div>
					</div>

					<div className="items-center relative hidden lg:flex">
						<Link href="https://discord.gg/meme">
							<a
								className="inline-block text-gray-800 dark:text-light-200 hover:text-dank-300 dark:hover:text-dank-100"
								rel="noreferrer noopener"
							>
								Support
							</a>
						</Link>
						{!user && (
							<Link href="/api/auth/login">
								<a
									className="inline-block text-dank-300 pl-4"
									rel="noreferrer noopener"
								>
									Login
								</a>
							</Link>
						)}
						{user && (
							<div className="pl-4 h-full">
								<Dropdown
									content={
										<div className="flex items-center space-x-2">
											<Avatar
												id={user.id}
												link={user.avatar}
												size="32px"
											/>
											<div className="text-dark-400 dark:text-white">
												{user.username}
											</div>
											<span className="material-icons text-dark-100 dark:text-white">
												expand_more
											</span>
										</div>
									}
									variant="big"
								>
									<ul className="rounded-md bg-light-500 dark:bg-dark-100 mt-2 py-2 text-sm text-dark-100 dark:text-white">
										{user.moderator && (
											<Link href="/control">
												<li className="hover:bg-light-200 dark:hover:bg-dark-200 w-full px-4 py-1 transition duration-75 ease-in-out">
													Control panel
												</li>
											</Link>
										)}
										<Link href="/appeals">
											<li className="hover:bg-light-200 dark:hover:bg-dark-200 w-full px-4 py-1 transition duration-75 ease-in-out">
												Appeal a ban
											</li>
										</Link>
										<Link href="/reports">
											<li className="hover:bg-light-200 dark:hover:bg-dark-200 w-full px-4 py-1 transition duration-75 ease-in-out">
												Report a user
											</li>
										</Link>
										<Link href="/api/auth/logout">
											<li className="text-red-400 hover:bg-light-200 dark:hover:bg-dark-200 w-full px-4 py-1 transition duration-75 ease-in-out">
												Logout
											</li>
										</Link>
									</ul>
								</Dropdown>
							</div>
						)}
					</div>
					<div
						className="items-center relative flex lg:hidden cursor-pointer select-none text-dank-500 dark:text-light-100"
						onClick={() => setHamburger(!hamburger)}
					>
						<span className="material-icons">menu</span>
					</div>
				</nav>
				{hamburger && (
					<ul className="absolute flex flex-col bg-light-200 dark:bg-dark-200 box-border w-screen h-screen z-50 px-6 top-[74px]">
						<Link href="/commands">
							<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
								Commands
							</li>
						</Link>
						<Link href="/faq">
							<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
								Frequently asked questions
							</li>
						</Link>
						<Link href="/community">
							<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
								Community
							</li>
						</Link>
						<Link href="/loot">
							<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
								Store
							</li>
						</Link>
						<Link href="/items">
							<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
								Items
							</li>
						</Link>
						{user ? (
							<div className="mt-5 pt-5 border-t-[1px] border-dank-600">
								<div
									className="flex items-center justify-between w-full select-none"
									onClick={() =>
										setMobileAccountExpanded(
											!mobileAccountExpanded
										)
									}
								>
									<div className="flex items-center">
										<Avatar
											id={user.id}
											link={user.avatar}
											size="64px"
											className="mr-4"
										/>
										<div>
											<h3 className="font-montserrat font-bold leading-none">
												{user.username}
											</h3>
											<p className="text-sm italic text-light-600 font-medium leading-none">
												#{user.discriminator}
											</p>
										</div>
									</div>
									<span
										className="material-icons transition-transform ease-in-out"
										style={{
											transform: `rotate(${
												mobileAccountExpanded ? 180 : 0
											}deg)`,
										}}
									>
										expand_more
									</span>
								</div>
								<div
									id="account-links"
									className="pl-3 mb-5 overflow-hidden transition-all ease"
									style={{
										height: mobileAccountExpanded
											? user.moderator
												? "144px"
												: "96px"
											: "0px",
									}}
								>
									<Link href="/appeals">
										<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
											Appeal a ban
										</li>
									</Link>
									<Link href="/reports">
										<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
											Report a user
										</li>
									</Link>
									{user?.moderator && (
										<Link href="/control">
											<li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
												Control panel
											</li>
										</Link>
									)}
								</div>
								<Button
									variant="danger"
									size="medium"
									block
									href="/api/auth/logout"
								>
									Logout
								</Button>
							</div>
						) : (
							<div className="mt-5 pt-5 border-t-[1px] border-dank-600">
								<Button
									variant="primary"
									size="medium"
									block
									href="/api/auth/login"
								>
									Logout
								</Button>
							</div>
						)}
					</ul>
				)}
			</div>
		</>
	);
}
