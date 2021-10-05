import Link from "next/link";
import { User } from "../types";

interface Props {
	user?: User;
}

export default function Navbar({ user }: Props) {
	return (
		<div className="flex justify-center items-center text-lg">
			<nav className="max-w-7xl bg-dank-250 rounded-md w-11/12 flex justify-between p-4 mt-5">
				<div className="flex items-center">
					<Link href="/">
						<img src={"/img/memer.png"} alt="Logo" width="42" />
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

				<div className="flex items-center">
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
				</div>
			</nav>
		</div>
	);
}
