import TextLink from "../ui/TextLink";

export function BannedUser() {
	return (
		<div className="mb-40 flex flex-col space-y-2 items-center text-center text-dark-400 dark:text-white">
			<div className="bg-light-500 dark:bg-dark-400 rounded-md p-20">
				<div className="text-4xl font-bold">Not so fast!</div>
				<div className="flex flex-col items-center space-y-1">
					<div>
						Your account has been banned from purchasing any of our
						lootboxes! If you think this is a mistake, please join{" "}
						<TextLink href="https://discord.gg/meme">
							our support server
						</TextLink>{" "}
						for assistance. If this is correct, you may attempt to{" "}
						<TextLink href="/appeals">appeal your ban</TextLink>
					</div>

					<div className="flex space-x-2 items-center">
						<TextLink href="/appeals">Go Home</TextLink>
					</div>
				</div>
			</div>
		</div>
	);
}
