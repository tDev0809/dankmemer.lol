import Link from "next/link";

export function Success({ id }: { id?: string }) {
	return (
		<div className="mb-40">
			<div className="text-xl text-white font-bold">Success!</div>

			<div className="flex flex-col space-y-4">
				<div>
					Your payment has successfully been made. Your boxes should
					be deposited directly into your inventory within 5 minutes
					of completing the purchase.
				</div>
				<div>
					If they do not show up after 24 hours, join{" "}
					<a
						href="https://discord.gg/meme"
						target="_blank"
						rel="noopener noreferrer"
						className="text-dank-300"
					>
						the support server
					</a>{" "}
					and mention a mod or a developer for assistance.
				</div>
				<div>
					Additionally, can find your Payment ID below.
					<br />
					You should store this ID somewhere and make sure you don't
					lose it - it is necessary if you are experiencing any
					problems.
					<br />
					Payment ID:{" "}
					<span className="bg-dark-200 p-1 rounded-md">{id}</span>
				</div>
			</div>

			<a className="text-dank-300" href="/loot">
				Go to store
			</a>
		</div>
	);
}
