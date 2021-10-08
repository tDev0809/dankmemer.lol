import Link from "next/link";

interface Props {}

export default function Footer({}: Props) {
	return (
		<footer>
			<div className="bg-dank-800 font-montserrat">
				<div className="flex justify-center">
					<div className="flex flex-col lg:flex-row space-x-0 lg:space-x-72 space-y-4 lg:space-y-0 p-14 items-center lg:items-start">
						<div className="flex items-center space-x-4">
							<Link href="/">
								<img
									src={"/img/memer.png"}
									alt="Logo"
									width="100"
								/>
							</Link>
							<div className="flex flex-col -space-y-1">
								<h2 className="text-2xl font-bold">
									DANK MEMER
								</h2>
								<span className="text-md text-gra-400">
									Copyright © {new Date().getFullYear()} Dank
									Memer
								</span>
								<span data-ccpa-link="1"></span>
							</div>
						</div>
						<div className="flex space-x-12">
							<div className="flex flex-col space-y-0">
								<a
									className="text-gray-300 hover:text-white cursor-pointer"
									href="https://www.patreon.com/join/dankmemerbot"
								>
									Premium
								</a>
								<Link href="/commands">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Commands
									</span>
								</Link>
								<Link href="/blogs">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Our blog
									</span>
								</Link>
							</div>
							<div className="flex flex-col">
								<Link href="/staff">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Staff
									</span>
								</Link>
								<Link href="/terms">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Terms
									</span>
								</Link>
								<Link href="/privacy">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Privacy
									</span>
								</Link>
							</div>
							<div className="flex flex-col">
								<Link href="/rules">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Rules
									</span>
								</Link>
								<Link href="/reports">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Reports
									</span>
								</Link>
								<Link href="/appeals">
									<span className="text-gray-300 hover:text-white cursor-pointer">
										Appeals
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
