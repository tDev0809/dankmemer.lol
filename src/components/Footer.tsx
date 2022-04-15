import { useTheme } from "next-themes";
import Link from "next/link";
import { Expire } from "./ui/Expire";

interface Props {}

export default function Footer({}: Props) {
	const { theme, setTheme } = useTheme();

	return (
		<footer>
			<div className="bg-light-200  font-inter dark:bg-dark-400">
				<div className="flex justify-center">
					<div className="flex flex-col items-center space-x-0 space-y-4 p-14 lg:flex-row lg:space-x-72 lg:space-y-0">
						<div className="flex items-center space-x-4">
							<Link href="/">
								<img
									src={"/img/memer.png"}
									alt="Logo"
									width="100"
									height="100"
								/>
							</Link>
							<div className="flex flex-col -space-y-1">
								<h2 className="font-montserrat text-2xl font-bold text-dank-300 dark:text-light-200">
									DANK MEMER
								</h2>
								<span className="text-md text-gray-400">
									Copyright © {new Date().getFullYear()} Dank
									Memer
								</span>
								<span data-ccpa-link="1"></span>
							</div>
						</div>
						<div className="flex space-x-6 lg:space-x-12">
							<div className="flex flex-col space-y-0">
								<a
									className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white"
									href="https://www.patreon.com/join/dankmemerbot"
								>
									Premium
								</a>
								<Link href="/commands">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Commands
									</span>
								</Link>
								<Link href="/community/blogs">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Our blog
									</span>
								</Link>
							</div>
							<div className="flex flex-col">
								<Link href="/staff">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Staff
									</span>
								</Link>
								<Link href="/terms">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Terms
									</span>
								</Link>
								<Link href="/privacy">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Privacy
									</span>
								</Link>
							</div>
							<div className="flex flex-col">
								<Link href="/rules">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Rules
									</span>
								</Link>
								<Link href="/reports">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Reports
									</span>
								</Link>
								<Link href="/appeals">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Appeals
									</span>
								</Link>
							</div>
							<div className="flex flex-col">
								<Link href="/tutorials">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										Tutorials
									</span>
								</Link>
								<Link href="/jobs">
									<span className="cursor-pointer text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
										We're Hiring!
									</span>
								</Link>
								<span className="flex cursor-pointer select-none items-center text-dark-100 hover:text-dank-200 dark:text-gray-300 dark:hover:text-white">
									<div
										onClick={() =>
											setTheme(
												theme === "dark"
													? "light"
													: "dark"
											)
										}
									>
										{theme === "dark"
											? "Light Mode"
											: "Dark Mode"}
									</div>
									<Expire
										added={new Date("10-21-2021")}
										expireIn="month"
									>
										<div className="ml-2 rounded-md bg-red-500 px-2 py-0.5 text-xs text-white">
											NEW
										</div>
									</Expire>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
