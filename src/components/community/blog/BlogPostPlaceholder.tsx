import clsx from "clsx";
import Button from "../../ui/Button";

export function BlogPostPlaceholder() {
	return (
		<div
			className={clsx(
				"p-4 bg-light-500 dark:bg-dark-100 rounded-md w-full",
				"sm:h-52 lg:h-72"
			)}
		>
			<div className="flex flex-col justify-between space-y-4 h-full">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-1">
						<div
							className={clsx(
								"animate-pulse h-5 bg-gray-400 dark:bg-gray-300 rounded w-full"
							)}
						/>
						<div
							className={clsx(
								"animate-pulse h-3 bg-gray-500 dark:bg-gray-400 rounded w-full"
							)}
						/>
						<div
							className={clsx(
								"animate-pulse h-3 bg-gray-500 dark:bg-gray-400 rounded w-full"
							)}
						/>
					</div>
					<div className="flex flex-col space-y-1">
						<div
							className={clsx(
								"animate-pulse h-3 bg-gray-400 dark:bg-gray-300 rounded w-full"
							)}
						/>
						<div
							className={clsx(
								"animate-pulse h-3 bg-gray-400 dark:bg-gray-300 rounded w-full"
							)}
						/>
						<div
							className={clsx(
								"animate-pulse h-3 bg-gray-400 dark:bg-gray-300 rounded w-full"
							)}
						/>
						<div
							className={clsx(
								"animate-pulse h-3 bg-gray-400 dark:bg-gray-300 rounded w-full"
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					<Button variant="dark" disabled block>
						Continue Reading
					</Button>
				</div>
			</div>
		</div>
	);
}
