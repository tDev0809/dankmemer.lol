import Link from "next/link";
import TextLink from "../ui/TextLink";

export function BlockedCountry() {
	return (
		<div className="mb-40 flex flex-col space-y-2 items-center text-center text-dark-400 dark:text-white">
			<div className="bg-light-500 dark:bg-dark-400 rounded-md p-20">
				<div className="text-4xl font-bold">Sorry</div>
				<div className="flex flex-col items-center space-y-1">
					<div>
						Loot boxes are declared illegal in your country. As a
						result, you are unable to purchase any boxes.
					</div>
					<div>
						Alternatively, click{" "}
						<TextLink href="https://www.google.com/search?q=flights+to+usa">
							here
						</TextLink>{" "}
						to find flights to the Land of Freedom.
					</div>
					<div className="text-[8px]">
						also, your country gay lmao
					</div>
					<div className="flex space-x-2 items-center">
						<TextLink href="/">Go Home</TextLink>
					</div>
				</div>
			</div>
		</div>
	);
}
