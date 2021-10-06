import Link from "next/link";
import { User } from "../types";
import Dropdown from "./ui/Dropdown";

interface Props {
	user?: User;
}

export default function Navbar({ user }: Props) {
	return (
		<div className="flex justify-center items-center text-lg">
			<nav className="max-w-7xl bg-dank-250 rounded-md w-11/12 flex justify-between p-4 mt-5">
				<div className="flex items-center">
					<Link href="/">
						<img
							className="cursor-pointer"
							src={"/img/memer.png"}
							alt="Logo"
							width="42"
						/>
					</Link>
					<ul className="ml-5 flex space-x-4">
						<li className="inline-block hover:text-dank-50">
							<Link href="/commands">Commands</Link>
						</li>
						<li className="inline-block hover:text-dank-50">
							<Link href="/faq">FAQ</Link>
						</li>
						<li className="inline-block hover:text-dank-50">
							<Link href="/blogs">Blog</Link>
						</li>
						<li className="inline-block hover:text-dank-50">
							<Link href="/items">Items</Link>
						</li>
						<li className="inline-block hover:text-dank-50">
							<Link href="/feedback">Feedback</Link>
						</li>
					</ul>
				</div>

				<div className="flex items-center relative">
					<Link href="https://discord.gg/meme">
						<a
							className="inline-block hover:text-dank-50"
							rel="noreferrer noopener"
						>
							Support
						</a>
					</Link>
					{!user && (
						<Link href="/api/auth/login">
							<a
								className="inline-block text-dank-100 pl-4"
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
										<img
											className="w-8 rounded-full bg-dank-250"
											src={user.avatar}
										/>
										<div>{user.username}</div>
										<span className="material-icons text-white">
											expand_more
										</span>
									</div>
								}
								variant="big"
							>
								<ul className="rounded-md bg-dank-225 mt-2 py-2 text-sm">
									{(user.isModerator || user.isAdmin) && (
										<li className="hover:bg-dank-250 w-full px-4 py-1 transition duration-75 ease-in-out">
											<Link href="/control">
												Control panel
											</Link>
										</li>
									)}
									<li className="hover:bg-dank-250 w-full px-4 py-1 transition duration-75 ease-in-out">
										<Link href="/appeals">
											Appeal a ban
										</Link>
									</li>
									<li className="hover:bg-dank-250 w-full px-4 py-1 transition duration-75 ease-in-out">
										<Link href="/reports">
											Report a user
										</Link>
									</li>
									<li className="text-red-400 hover:bg-dank-250 w-full px-4 py-1 transition duration-75 ease-in-out">
										<Link href="/api/auth/logout">
											Logout
										</Link>
									</li>
								</ul>
							</Dropdown>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}
