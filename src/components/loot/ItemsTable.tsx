import { Box } from "../../types";
const itemsData = require("../../data/itemsData.json");

interface Props {
	activeBox: Box;
}

export function ItemsTable({ activeBox }: Props) {
	return (
		<table className="border border-gray-400 dark:border-dark-400 text-dark-400 dark:text-white">
			<thead className="text-left">
				<tr className="border border-gray-400 dark:border-dark-400 bg-dark-400 text-white dark:text-dark-400">
					<th className="p-1">Item name</th>
					<th className="p-1">Max. Amount</th>
				</tr>
			</thead>
			<tbody>
				{activeBox.items.map(({ name, amount }, i) => (
					<tr
						key={i}
						className="border border-gray-400 dark:border-dark-400 even:bg-dark-400 even:text-white"
					>
						<td className="p-1 flex items-center space-x-2">
							<img src={itemsData[name].image} className="w-6" />
							<span>{itemsData[name].name}</span>
						</td>
						<td className="p-1">{amount}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
