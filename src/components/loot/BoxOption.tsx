import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { Box } from "../../types";

const BOX_COLORS = ["border-white", "border-dank-300", "border-yellow-400"];

interface Props {
	data: Box;
	active: boolean;
	boxCount: number;
	setActiveBox: Dispatch<SetStateAction<Box>>;
	setBoxCount: Dispatch<SetStateAction<number>>;
}

export function BoxOption({
	data,
	active,
	setActiveBox,
	setBoxCount,
	boxCount,
}: Props) {
	return (
		<div
			className={clsx(
				"relative px-20 pt-14 pb-3 flex flex-col items-center cursor-pointer border-2 shadow-2xl h-full bg-light-500 dark:bg-dark-400",
				active
					? BOX_COLORS[data.id]
					: "border-light-500 dark:border-dark-400"
			)}
			onClick={() => {
				setActiveBox(data);
			}}
		>
			<div className="text-3xl font-bold font-montserrat text-dark-400 dark:text-white">
				{data.name.toUpperCase()}
			</div>
			<div className="text-2xl font-bold font-montserrat text-dank-300">
				${data.price}
			</div>
			{active && (
				<div className="flex items-center justify-center text-dark-400 dark:text-white">
					<div
						className="font-bold select-none p-1"
						onClick={(e) => {
							setBoxCount(boxCount - 1);
							e.stopPropagation();
						}}
					>
						-
					</div>
					<input
						className="bg-transparent w-12 border-none text-center resize-none outline-none overflow-hidden"
						placeholder="Boxes"
						onChange={(e) =>
							setBoxCount(parseFloat(e.target.value))
						}
						value={boxCount}
					/>
					<div
						className="font-bold select-none p-1"
						onClick={(e) => {
							setBoxCount(boxCount + 1);
							e.stopPropagation();
						}}
					>
						+
					</div>
				</div>
			)}
		</div>
	);
}
