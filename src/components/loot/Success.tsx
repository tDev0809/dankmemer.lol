export function Success({ id }: { id?: string }) {
	return (
		<div className="mb-40 flex flex-col items-center text-center text-dark-400 dark:text-white">
			<div className="bg-light-500 dark:bg-dark-400 rounded-md p-20 flex flex-col space-y-2">
				<div className="text-2xl font-bold text-dank-300">Success!</div>

				<div className="flex flex-col space-y-4">
					<div>
						Your payment has successfully been made. Your boxes
						should be deposited directly into your inventory within
						5 minutes of completing the purchase.
					</div>
					<div>
						If they do not show up after 48 hours, join{" "}
						<a
							href="https://discord.gg/dankmemerbot"
							target="_blank"
							rel="noopener noreferrer"
							className="text-dank-300"
						>
							the support server
						</a>{" "}
					</div>
					<div>Additionally, can find your Payment ID below.</div>
					<div>
						You should store this ID somewhere and make sure you
						don't lose it - it is necessary if you are experiencing
						any problems.
					</div>
					<div>
						<div></div>
						Payment ID:{" "}
						<span className="bg-light-300 dark:bg-dark-200 p-1 rounded-md">
							{id}
						</span>
					</div>

					<a className="text-dank-300" href="/loot">
						Go back to store
					</a>
				</div>
			</div>
		</div>
	);
}
