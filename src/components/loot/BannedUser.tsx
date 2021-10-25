import Link from "next/link";

export function BannedUser() {
	return (
		<div className="mb-40 flex flex-col space-y-2 items-center text-center text-dark-400 dark:text-white">
			<div className="bg-light-500 dark:bg-dark-400 rounded-md p-20">
				<div className="text-4xl font-bold">Not so fast!</div>
				<div className="flex flex-col items-center space-y-1">
					<div>
						Your account has been banned from purchasing any of our
						lootboxes! If you think this is a mistake, please join{" "}
						<Link href="https://discord.gg/meme">
							<a target="_blank" className="text-dank-300">
								our support server
							</a>
						</Link>{" "}
						for assistance. If this is correct, you may attempt to{" "}
						<Link href="/appeals">
							<a className="text-dank-300">appeal your ban</a>
						</Link>
					</div>

					<div className="flex space-x-2 items-center">
						<Link href="/">
							<a className="text-dank-300">Go Home</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
