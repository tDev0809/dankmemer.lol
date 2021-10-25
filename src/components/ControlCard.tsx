import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";

const types = {
	normal: "border-8 border-dank-300 bg-dank-200",
	destructive: "border-8 border-red-600 bg-red-500",
};

interface Props {
	icon: string;
	label: string;
	type: keyof typeof types;
	input?: {
		icon: string;
		placeholder: string;
	};
	dropdown?: {
		icon: string;
		initial: string;
		options: {
			text: string;
			value: string;
		}[];
	};
	endpoint: string;
	finish?: (data: any) => void;
}

export function ControlCard({
	icon,
	label,
	type,
	input,
	dropdown,
	endpoint,
	finish,
}: Props) {
	const [inputData, setInputData] = useState("");
	const [dropdownData, setDropdownData] = useState<string | null>();
	const [processing, setProcessing] = useState(false);

	return (
		<div className="flex flex-col justify-between items-start rounded-md p-8 w-80 h-80 bg-light-500 dark:bg-dark-400">
			<div className="flex flex-col space-y-4">
				<div className="flex justify-between items-center space-x-4">
					<div
						className={clsx(
							"flex items-center justify-center p-4 rounded-full",
							types[type]
						)}
					>
						<span className="material-icons">{icon}</span>
					</div>
					<div className="font-bold font-montserrat text-xl text-dark-400 dark:text-white">
						{label}
					</div>
				</div>
				<div className="space-y-4">
					{input && (
						<div className="flex items-center space-x-2 dark:bg-dank-500 px-3 py-3 h-10 w-full text-sm rounded-md text-black dark:text-light-300 bg-gray-100 placeholder-gray-500">
							<span className="material-icons text-gray-500">
								{input.icon}
							</span>
							<textarea
								className="outline-none overflow-hidden resize-none bg-transparent h-full"
								onChange={(e) => setInputData(e.target.value)}
								value={inputData}
								placeholder={input.placeholder}
							/>
						</div>
					)}
					{dropdown && (
						<Dropdown
							content={
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center space-x-2">
										<span className="material-icons text-dark-400 dark:text-gray-500">
											{dropdown.icon}
										</span>
										<div className="text-dark-400 dark:text-gray-500">
											{dropdownData || dropdown.initial}
										</div>
									</div>

									<div className="material-icons text-dark-100 dark:text-gray-500">
										expand_more
									</div>
								</div>
							}
							variant="big"
						>
							<ul className="rounded-md mt-1 py-2 text-sm text-dark-100 dark:text-white bg-gray-100 dark:bg-dark-100">
								{dropdown.options.map((option) => (
									<li
										className="hover:bg-light-200 dark:hover:bg-dark-200 w-full px-4 py-1 transition duration-75 ease-in-out"
										onClick={(e) => {
											setDropdownData(option.value);
										}}
									>
										{option.text}
									</li>
								))}
							</ul>
						</Dropdown>
					)}
				</div>
			</div>
			<Button
				disabled={
					processing ||
					(input && inputData.length === 0) ||
					(dropdown && (!dropdownData || dropdownData?.length == 0))
				}
				size="medium"
				className="text-white bg-dank-300 hover:bg-opacity-75"
				onClick={async () => {
					setProcessing(true);
					const postEndpoint = endpoint
						.replace("{{input}}", inputData)
						.replace("{{dropdown}}", dropdownData || "");
					await axios(postEndpoint)
						.then((data) => {
							if (data.status !== 200) {
								toast.dark(data.data.error);
							}
							if (finish) {
								finish(data);
							}
							setDropdownData(null);
							setInputData("");
							setProcessing(false);
						})
						.catch((e) => {
							setProcessing(false);
							console.error(e);
							toast.dark(e.response.statusText);
						});
				}}
			>
				Confirm
			</Button>
		</div>
	);
}
