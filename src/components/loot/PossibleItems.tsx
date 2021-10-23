import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Box } from "../../types";
const itemsData = require("../../data/itemsData.json");

interface Props {
	activeBox: Box;
}

export function PossibleItems({ activeBox }: Props) {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div></div>;
	}

	return (
		<div className="flex flex-col space-y-10">
			<div>
				<div className="text-xl font-bold text-dark-400 dark:text-white">
					Possible items
				</div>
				<div className="text-gray-400">
					Below includes a list of all the goodies and the maximum
					amount of items you could receive from the purchase of a{" "}
					<span className="text-dank-300">{activeBox.name}</span>!
					Along with these items, you have the chance of getting
					anywhere in the range of{" "}
					<span className="text-dank-300">⏣ {activeBox.yield}</span>.
				</div>
			</div>
			<table className="border border-gray-400 dark:border-dark-400 text-dark-400 dark:text-white">
				<thead className="text-left">
					<tr
						className={clsx(
							"border border-gray-200 dark:border-dark-400 text-dark-400 dark:text-white",
							theme === "dark" ? "bg-dark-400" : "bg-gray-100"
						)}
					>
						<th className="p-1">Item name</th>
						<th className="p-1">Max. Amount</th>
					</tr>
				</thead>
				<tbody>
					{activeBox.items.map(({ name, amount }, i) => (
						<tr
							key={i}
							className={clsx(
								"border border-gray-200 dark:border-dark-400 text-dark-400 dark:text-white",
								theme === "dark"
									? "even:bg-dark-400"
									: "even:bg-gray-100"
							)}
						>
							<td className="p-1 flex items-center space-x-2">
								<img
									src={itemsData[name].image}
									className="w-6"
								/>
								<span>{itemsData[name].name}</span>
							</td>
							<td className="p-1">{amount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
